import {Modal, ModalOverlay,ModalContent,ModalHeader, ModalFooter, ModalBody,ModalCloseButton, useDisclosure, Button,
} from "@chakra-ui/react";
import ErrorMessage from "./ErrorMessage";
import { useProjects } from "../hooks/useProjects";
import { useState } from "react";
import toast from "react-hot-toast";
import AsignRoles from "./AsignRoles";
import {  doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function ProjectsList() {
  const { projects, error, loading } = useProjects();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[editMember,setEditMember]=useState([])
  const[editLoading,setEditLoading]=useState(false)
  function handleAssign(member){
    const alreadySelected = editMember.some((user)=> user.id === member.id)
    if(alreadySelected){
      toast.error("Already added")
      return
    }
    setEditMember((prev)=>[...prev,{id: member.id,name: member.name,email: member.email}])
    }

   async function handleUpdate(project){
    setEditLoading(true)
      if(editMember.length === 0){
        return
      }
      const projectRef = doc(db,"projects",project.id)
      await updateDoc(projectRef,{editMembers: editMember})
      toast.success("Task updated")
      onClose()
      setEditLoading(false)
    }
  return (
    <div className="projectsDiv">
      {error && <ErrorMessage error={error} />}
      {loading && <p>Fetching projects...</p>}
      <div className="project">
        {projects.map((project) => (
          <div key={project.id}>
            <h2>{project.title}</h2>
            <div className="projectDiv">
                <Button bg="orange.200" marginTop="10px" onClick={onOpen}>View more</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader><h2>{project.title}</h2></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="projectModal">
                        <h2><strong>Projet description</strong></h2>
                        <p>{project.description}</p>
                        <h2><strong>Due date</strong></h2>
                        <p>{project.dueDate}</p>
                        <h2><strong>Project priority</strong></h2>
                        <p> {project.projectPriority}</p>
                        <div>
                          <h2>Add who can edit</h2>
                          <AsignRoles handleAssign={handleAssign} editMember={editMember}/>
                        </div>
                        <h2><strong>Team members</strong></h2>
                        {project.teamMember?.map((member) => (
                          <ol key={member.id}>
                              <div>
                            <li><p>{member.name} | {member.email} </p></li>
                          </div>
                          </ol>
                        ))}
                        <h2><strong>Members who can edit</strong></h2>
                        {
                          project.editMembers?.map((member)=>(
                              <ol key={member.id}>
                                <div>
                                  <li><p>{member.name} | {member.email} </p></li>
                                </div>
                              </ol>
                          ))
                        }
                    </ModalBody>
                    <ModalFooter>
                      <Button bg="orange.200"  mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button onClick={()=>handleUpdate(project)} isDisabled={editLoading}>{editLoading ? "Updating...": "Update"}</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;
