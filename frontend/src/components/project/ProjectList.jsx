/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useInfiniteProjects } from "../../api/projects";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { lazy, Suspense } from "react";

const ProjectTemplate = lazy(() => import("./ProjectCard"));

const ProjectList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteProjects({ limit: 6 });

  const projects = data?.pages?.flat() || [];

  const fetchProjects = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      {isError && (
        <p className="text-center text-red-500 py-4 font-semibold">
          Failed to load projects. Please try again.
        </p>
      )}
      {isLoading && (
        <p className="text-center text-gray-500 py-4">
          Loading projects...
        </p>
      )}
      <InfiniteScroll
        dataLength={projects.length}
        next={fetchProjects}
        hasMore={Boolean(hasNextPage)}
        loader={
          <p className="text-center text-gray-500 py-4">
            Loading more projects...
          </p>
        }
        endMessage={
          <p className="text-center text-green-600 py-4 font-semibold">
            Yay! You have seen all projects.
          </p>
        }
      >
        <div className="flex flex-wrap gap-4 justify-center items-start px-4 py-6">
          {projects.map((project, index) => (
            <Suspense
              key={project.id || project._id || Math.random()}
              fallback={<div className="text-center">Loading project...</div>}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
              >
                <ProjectTemplate p={project} />
              </motion.div>
            </Suspense>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default ProjectList;
