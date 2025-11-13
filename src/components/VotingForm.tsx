import { useState, useEffect, type FormEvent } from "react";
import * as Select from "@radix-ui/react-select";
import type { Country, VoteSubmission } from "../types";
import { api } from "../api/service";
import { ChevronDownIcon, CheckIcon } from "./Icons";

interface VotingFormProps {
  onVoteSubmitted: () => void;
}

export const VotingForm = ({ onVoteSubmitted }: VotingFormProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState<VoteSubmission>({
    name: "",
    email: "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<VoteSubmission>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const data = await api.getCountries();
      setCountries(data);
    } catch (error) {
      console.error("Failed to load countries:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<VoteSubmission> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await api.submitVote(formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", country: "" });
      onVoteSubmitted();

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit vote"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = countries.find((c) => c.code === formData.country);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Vote your Favourite Country
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1">
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="flex-1">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Country Select */}
          <div className="flex-1">
            <Select.Root
              value={formData.country}
              onValueChange={(value) =>
                setFormData({ ...formData, country: value })
              }
            >
              <Select.Trigger
                className={`w-full px-4 py-2.5 border rounded-md bg-white flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <Select.Value placeholder="Country">
                  {selectedCountry?.name || "Country"}
                </Select.Value>
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden max-h-96 z-50">
                  <Select.Viewport className="p-1">
                    {countries.map((country) => (
                      <Select.Item
                        key={country.code}
                        value={country.code}
                        className="relative flex items-center px-8 py-2 rounded cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none data-[highlighted]:bg-gray-100"
                      >
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon />
                        </Select.ItemIndicator>
                        <Select.ItemText>{country.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            {errors.country && (
              <p className="mt-1 text-xs text-red-600">{errors.country}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {isSubmitting ? "Submitting..." : "Submit Vote"}
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
            Vote submitted successfully!
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
            {submitError}
          </div>
        )}
      </form>
    </div>
  );
};
