const OBJECT_ID_REGEX = /^[a-fA-F0-9]{24}$/;

export const isValidObjectId = (value) =>
  typeof value === "string" && OBJECT_ID_REGEX.test(value);

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
};

const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const unique = (items) => Array.from(new Set(items));

export const buildProjectPayload = (formData = {}) => {
  const title = formData.title?.trim() || "";
  const description = formData.description?.trim() || "";

  const coverImage = formData.coverImage?.trim();
  const gallery = parseList(formData.gallery);
  const images = unique(
    [coverImage, ...gallery].map((value) => value?.trim()).filter(Boolean)
  );

  const payload = { title, description };

  if (images.length) payload.images = images;

  const categoryId = formData.category?.trim();
  if (isValidObjectId(categoryId)) {
    payload.category = categoryId;
  }

  const techList = normalizeArray(formData.technologies)
    .map((value) => (value?.toString ? value.toString() : value))
    .filter(Boolean)
    .filter(isValidObjectId);

  if (techList.length) {
    payload.technologies = unique(techList);
  }

  const liveDemo = formData.liveDemo?.trim();
  if (liveDemo) payload.liveDemo = liveDemo;

  const githubRepo = formData.githubRepo?.trim();
  if (githubRepo) payload.githubRepo = githubRepo;

  return payload;
};

export const buildProjectFormDefaults = (project = {}) => {
  const rawImages = Array.isArray(project.images)
    ? project.images
    : project.image
      ? [project.image]
      : [];

  const categoryId =
    project.category?._id ||
    project.category?.id ||
    project.category ||
    "";

  const technologies = normalizeArray(project.technologies)
    .map((tech) => tech?._id || tech?.id || tech)
    .filter(Boolean)
    .filter(isValidObjectId);

  return {
    title: project.title || "",
    description: project.description || "",
    coverImage: rawImages[0] || "",
    gallery: rawImages.slice(1).join(", "),
    category: isValidObjectId(categoryId) ? categoryId : "",
    technologies,
    liveDemo: project.liveDemo || "",
    githubRepo: project.githubRepo || "",
  };
};

