import {
  Save,
  Trash2,
  Image,
  FileText,
  Tag,
  Link2,
  Github,
  Layers,
} from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import Button from "../common/Button";

const InputField = ({ label, icon: Icon, error, children, required }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      {Icon && <Icon size={16} className="text-gray-500" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-sm text-red-500 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full" />
        {error.message}
      </p>
    )}
  </div>
);

const ProjectForm = ({
  defaultValues,
  onSubmit,
  onDelete,
  isEdit,
  loading,
  categories = [],
  technologies = [],
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const watchedCover = watch("coverImage");

  const inputStyles =
    "w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:bg-white focus:ring-1 focus:ring-yellow-600/20 transition-all outline-none";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {watchedCover && (
            <div className="flex justify-center">
              <img
                src={watchedCover}
                alt="Project preview"
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                onError={(e) => e.target.classList.add("hidden")}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField label="Cover Image" icon={Image} error={errors.coverImage}>
                <input
                  {...register("coverImage", {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Please enter a valid image URL",
                    },
                  })}
                  placeholder="https://example.com/preview.jpg"
                  type="url"
                  className={inputStyles}
                />
              </InputField>

              <InputField label="Project Title" icon={FileText} error={errors.title} required>
                <input
                  {...register("title", {
                    required: "Project title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                  })}
                  placeholder="Enter project title"
                  className={inputStyles}
                />
              </InputField>

              <InputField label="Live Demo URL" icon={Link2} error={errors.liveDemo}>
                <input
                  {...register("liveDemo", {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Please enter a valid URL",
                    },
                  })}
                  placeholder="https://yourproject.com"
                  type="url"
                  className={inputStyles}
                />
              </InputField>

              <InputField label="GitHub Repository" icon={Github} error={errors.githubRepo}>
                <input
                  {...register("githubRepo", {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Please enter a valid URL",
                    },
                  })}
                  placeholder="https://github.com/username/repo"
                  type="url"
                  className={inputStyles}
                />
              </InputField>
            </div>

            <div className="space-y-4">
              <InputField label="Category" icon={Tag} error={errors.category}>
                <select {...register("category")} className={inputStyles}>
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id || cat.id} value={cat._id || cat.id}>
                      {cat.name || cat.title}
                    </option>
                  ))}
                </select>
              </InputField>

              <InputField label="Technologies" icon={Layers} error={errors.technologies}>
                <select
                  {...register("technologies")}
                  multiple
                  className={`${inputStyles} h-32`}
                >
                  {technologies.map((tech) => (
                    <option key={tech._id || tech.id} value={tech._id || tech.id}>
                      {tech.name || tech.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500">
                  Hold Ctrl/Cmd to select multiple technologies.
                </p>
              </InputField>

              <InputField label="Gallery Images" icon={Image} error={errors.gallery}>
                <textarea
                  {...register("gallery")}
                  placeholder="Paste additional image URLs, separated by commas"
                  rows={4}
                  className={`${inputStyles} resize-y`}
                />
              </InputField>
            </div>
          </div>

          <InputField label="Project Description" icon={FileText} error={errors.description} required>
            <textarea
              {...register("description", {
                required: "Project description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" },
              })}
              placeholder="Describe your project..."
              rows={4}
              className={`${inputStyles} resize-y`}
            />
          </InputField>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <Button type="submit" icon={Save} iconColor="text-yellow-600" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Project" : "Publish Project"}
            </Button>
            {isEdit && onDelete && (
              <Button
                type="button"
                icon={Trash2}
                iconColor="text-red-500"
                onClick={onDelete}
                variant="danger"
              >
                Delete Project
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;

























