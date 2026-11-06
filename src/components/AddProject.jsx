import {Modal,ModalOverlay, ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure,Button,FormControl,FormLabel,Select,FormHelperText,Input,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
function AddProject() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState({})
  const[projectForm,setProjectForm]=useState({
    title:"",
    description:"",
    dueDate:""
  })
  const[teamMember,setTeamMember]=useState([]);
  const[projectPriority,setProjectPriority]=useState("")
  const{loggedInUser}=useUser()

  function handleFormInput(e){
    const{name,value}=e.target
    setProjectForm((prev)=>({...prev,[name]:value}))
    setError({})
  }
  function handleSelect(e){
    const{name,value}=e.target
    setProjectPriority((prev)=>({...prev,[name]:value}))
    setError({})
    
  }

  async function handleSubmit(e){
    e.preventDefault();

    setError({})
    setLoading(true)

    const newErrors = {}
    const{title,description,dueDate}=projectForm
    if(!title.trim()){
        newErrors.title = "Please add project title"
    }
    if(!description.trim()){
        newErrors.description = "Please add a description"
    }
    if(!dueDate.trim()){
        newErrors.dueDate = "Please add a due date"
    }
    if(teamMember.length === 0){
        newErrors.teamMember = "Please add team members"
    }
    if(!projectPriority){
        newErrors.projectPriority = "Please choose priority"
    }

    setError(newErrors)
    if(Object.keys(newErrors).length > 0){
        setLoading(false)
        return
    }

    try {
        const newProject = {
            title: title,
            description: description,
            dueDate: dueDate,
            projectPriority: projectPriority,
            teamMember: teamMember,
            addedBy: loggedInUser?.id ?? null,
            addedOn: serverTimestamp()
                }
            const projectRef = collection(db,"projects")
            await addDoc(projectRef,newProject)
            setProjectForm({title:"", description:"",dueDate:""})
            setProjectPriority("")
            setTeamMember([])
            onClose()
            toast.success("Project added")
        
    } catch (err) {
        setError({general: err.message})
        toast.error(err.message)
        
    }finally{
        setLoading(false)
    }
  }

  return (
    <section className="projects">
      <div className="addProject">
        <Button onClick={onOpen}>Add a project</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit}>
            <ModalHeader>Enter project details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Project Title</FormLabel>
                <Input type="text" name="title" value={projectForm.title} onChange={handleFormInput}/>
                <FormHelperText>Mobile app version.</FormHelperText>
                <div className="formErrorContainer">
                {error.title && <p>{error.title}</p>}
              </div>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input type="text" name="description" value={projectForm.description} onChange={handleFormInput}/>
                <FormHelperText>Describe the project.</FormHelperText>
                <div className="formErrorContainer">
                {error.description && <p>{error.description}</p>}
              </div>
              </FormControl>
              <FormControl>
                <FormLabel>Deadline</FormLabel>
                <Input type="date" name="dueDate" value={projectForm.dueDate} onChange={handleFormInput}/>
                <FormHelperText>Due date.</FormHelperText>
                <div className="formErrorContainer">
                {error.dueDate && <p>{error.dueDate}</p>}
              </div>
              </FormControl>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select placeholder="Select option" name="priority" value={projectPriority} onChange={handleSelect}>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </Select>
                <div className="formErrorContainer">
                {error.projectPriority && <p>{error.projectPriority}</p>}
              </div>
              </FormControl>
              <FormControl>
                <FormLabel>Team members</FormLabel>
                <Input placeholder="Search for team member" name="members" value={teamMember} onChange={(e)=>setTeamMember(e.target.value)}/>
                <div className="formErrorContainer">
                {error.teamMember && <p>{error.teamMember}</p>}
              </div>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit" isDisabled={loading}>{loading ? "Adding":"Add"}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}

export default AddProject;
