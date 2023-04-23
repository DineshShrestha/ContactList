import React, { Component } from 'react'
import Header from '../Layout/Header'
import AddRandomContact from './AddRandomContact'
import RemoveAllContacts from './RemoveAllContacts'
import AddContact from './AddContact'
import FavoriteContacts from './FavoriteContacts'
import GeneralContacts from './GeneralContacts'
import Footer from '../Layout/Footer'

export default class ContactIndex extends Component {
  constructor(props){
    super(props);
    this.state={
      contactList:[
        {
          id: 1,
          name: "Ben Parker",
          phone: "666-666-7770",
          email: "ben@gmail.com",
          isFavorite: false,
        },
        {
          id: 2,
          name: "Ben Stoke",
          phone: "666-456-7450",
          email: "benS@gmail.com",
          isFavorite: true,
        },
        {
          id: 3,
          name: "Bina Park",
          phone: "666-888-79970",
          email: "binaP@hotmail.com",
          isFavorite: false,
        },
      ],
      selectedContact: undefined,
      isUpdating: false,
    }
    
  }
  handleAddContact= (newContact)=>{
    if(newContact.name===""){
      return{status: "failure", msg: "Please enter a valid Name"}
    }else if(newContact.Phone===""){
      return{status: "failure", msg: "Please enter a valid Phone Number"}
    }
    const duplicateRecord = this.state.contactList.filter((x)=>{
      if(x.name==newContact.name && x.phone == newContact.phone){
        return true
      }
    })
    if(duplicateRecord.length>0){
      return{status:"failure", msg: "Duplicate record"}
    }else{
      const newFinalContact = {
        ...newContact,
        id:this.state.contactList[this.state.contactList.length-1].id+1,
        isFavorite: true
      }
      this.setState((prevState)=> {
        return {
          contactList: prevState.contactList.concat([newFinalContact])
        }
      })
      return{status:"success", msg:"Contact was added successfully"}
    }
  }
  handleToggleFavorite=(contact)=>{
    this.setState((prevState)=>{
      return{
        contactList: prevState.contactList.map(obj=>{
          if(obj.id==contact.id){
            return{...obj, isFavorite: !obj.isFavorite};
          }
          return obj;
        })
      }
    })
  }
  handleDeleteContact=(contactId)=>{
   this.setState((prevState)=>{
    return{
      contactList: prevState.contactList.filter((obj)=>{
        return obj.id!==contactId;
      })
    }
   })
  }
  handleAddRandomContact=(newContact)=>{
    const newFinalContact= {
      ...newContact,
      id: this.state.contactList[this.state.contactList.length - 1].id +  1,
      isFavorite: false
    }
    this.setState((prevState)=> {
      return {
        contactList: prevState.contactList.concat([newFinalContact])
      }
    })
  }
  handleRemoveAllContact=()=>{
    
    this.setState((prevState)=> {
      return {
        contactList: [],
      }
    })
  }
  handleUpdateClick=(contact)=>{    
    console.log(contact);
    this.setState((prevState)=> {
      return {
        selectedContact: contact,
        isUpdating: true
      }
    })
  }
  handleCancelUpdateContact=(contact)=>{    
    this.setState((prevState)=> {
      return {
        selectedContact: undefined,
        isUpdating: false
      }
    })
  }
  handleUpdateContact= (updatedContact)=>{
    if(updatedContact.name===""){
      return{status: "failure", msg: "Please enter a valid Name"}
    }else if(updatedContact.Phone===""){
      return{status: "failure", msg: "Please enter a valid Phone Number"}
    }
    
      this.setState((prevState)=> {
        return {
          contactList: prevState.contactList.map((obj)=>{
            if(obj.id==updatedContact.id){
              return{
                ...obj,
                name:updatedContact.name,
                email:updatedContact.email,
                phone:updatedContact.phone
              }
            }
            return obj;
          }),
          isUpdating: false,
          selectedContact: undefined
        }
      })
      return{status:"success", msg:"Contact was updated successfully"}
  }
  render() {
    return (
      <div>
        <Header/>
        <div className='container' style={{minHeight:"85vH"}}>
            <div className='row py-3'>
                <div className='col-4 offset-2 row'>
                    <AddRandomContact 
                       
                        handleAddRandomContact={this.handleAddRandomContact}/>
                </div>
                <div className='col-4 row'>
                    <RemoveAllContacts handleRemoveAllContact={this.handleRemoveAllContact}/>
                </div>
                <div className='row py-2'>
                  <div className='col-8 offset-2 row'>
                    <AddContact handleAddContact={this.handleAddContact}  isUpdating={this.state.isUpdating} 
                        selectedContact={this.state.selectedContact}
                        cancelUpdateContact={this.handleCancelUpdateContact}
                        handleUpdateContact={this.handleUpdateContact}
                        />
                    </div>
                </div>
                <div className='row py-2'>
                <div className='col-8 offset-2 row'>
                    <FavoriteContacts contacts={this.state.contactList.filter((u)=> u.isFavorite === true)} 
                    favoriteClick={this.handleToggleFavorite} 
                    deleteContact={this.handleDeleteContact}
                    updateClick={this.handleUpdateClick}/>
                    </div>
                </div>
                <div className='row py-2'>
                <div className='col-8 offset-2 row'>
                    <GeneralContacts contacts={this.state.contactList.filter((u)=> u.isFavorite === false)} 
                      favoriteClick={this.handleToggleFavorite} 
                      deleteContact={this.handleDeleteContact}
                      updateClick={this.handleUpdateClick}/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
