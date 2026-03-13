import FilterSidebar from "../../components/filters/FilterSidebar";
import ProjectList from "../../components/project/ProjectList";



const ProjectsPage = () => {
  return (
    <div className="flex">
        <div className="w-1/4 p-4 border-r border-gray-100">
            <FilterSidebar/>
        </div>
        <div className="w-3/4 p-4">
            <ProjectList />
        </div>
      
    </div>
  )
}

export default ProjectsPage



//when home in navbar click then it open this page
