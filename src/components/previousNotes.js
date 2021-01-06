import React, { Component } from 'react';
import 'primeflex/primeflex.css';
import firebase from '../config/firebase'
import { Card } from 'primereact/card';
import {Button } from 'primereact/button'




const ref =  firebase.database().ref('notes');


class previousNotes extends Component {


    state = {
        notes: [],
        updateModal: false,
        updatedNote: "",
        updatedKey: ""
    }

    componentWillMount(){

        const previousNotes = this.state.notes;

    ref.on('child_added', snap => {
      previousNotes.push({
        note: snap,
      })

      this.setState({
        notes: previousNotes
      })
      //console.log(this.state.notes)
    })

    }

    deleteNote = (id) => {
        //console.log(id);
        firebase.database().ref('notes/'+ id).remove();

        const updatedNotes = [];
        ref.on('child_added', snap => {
            updatedNotes.push({
              note: snap,
            })
      
            this.setState({
              notes: updatedNotes
            })
            //console.log(this.state.notes)
          })


    }
    
    updateNote = (val) => {

        const key = val.note.key;

        this.setState({updatedNote: val.note.val().noteContent})
        this.setState({updatedKey:key})
        this.setState({updateModal: true})

       

    }


    saveUpdatedNote = () => {
        //console.log(this.state.updatedKey)
        firebase.database().ref('notes/'+ this.state.updatedKey).update({'noteContent': this.state.updatedNote})
        this.setState({updateModal: false})

        const updatedNotes = [];
        ref.on('child_added', snap => {
            updatedNotes.push({
              note: snap,
            })
      
            this.setState({
              notes: updatedNotes
            })
            //console.log(this.state.notes)
          })

    }

    render() {

        // const footer = <span>
        //                     <Button  label="Delete" icon="pi pi-check" style={{marginRight: '.25em'}}/>
        //                 </span>;

        const notes = this.state.notes.map((val) => {
            //console.log(val.note.date)
            const key = val.note.key;
            //console.log(key);
            return <div  className="p-shadow-20" key={key}> 
                    <Card  subTitle={val.note.val().date} >
                   
                        {val.note.val().noteContent}
                       
                       <br/>
                        <span>
                            <Button onClick={() => this.deleteNote(key)} label="Delete" icon="pi pi-check" style={{marginRight: '.25em'}}/>
                            <Button onClick={() => this.updateNote(val)} label="Update" icon="pi pi-check" style={{marginRight: '.25em'}}/>
                        </span>
                        <br/><br/>
                    </Card>
                       
            </div> 
        })

        
          

        return (
            <div>
                <div style={{height:'420px', width: '500px', overflowY: 'scroll'}}>
                 <ul>
                    {notes}
                </ul>
                </div>
                {this.state.updateModal 
                
                ? <div>
                    <label>
                            updatedNote: 
                            <input
                            name="updatedNote"
                            type="text"
                            value={this.state.updatedNote}
                            onChange={e => this.setState({updatedNote: (e.target.value)})}
                            />
                    </label>
                    <Button onClick={ this.saveUpdatedNote} label="Save" icon="pi pi-check" style={{marginRight: '.25em'}}/>
                </div> 
                
                
                : <div></div>}

            </div>
        );
    }
}

export default previousNotes;