import React, { Component } from 'react';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import firebase from '../config/firebase'

const ref =  firebase.database().ref('notes');


class diaryEditor extends Component {


    state = {
        text: "",
        date: "",
        notes: [] 
    }

    saveNote = (e) => { 
        e.preventDefault()
        console.log(this.state.text, this.state.date)

        const data = {
            noteContent: this.state.text,
            date: this.state.date
        }

        ref.push(data);
    }
    cancelNote = () => {
        this.setState({text: ""})
    }


    render() {

        const header = (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );

        return (
            <div>
                
                            
                <div style={{height:'420px', width: '500px'}} className="p-shadow-20" >
                <label>
                Date: 
                <input
                name="date"
                type="date"
                value={this.state.date}
                onChange={e => this.setState({date: (e.target.value)})}
                required />
            </label>
                    <Editor style={{height:'320px'}} value={this.state.text} onTextChange={(e) => this.setState({text: e.textValue})} headerTemplate={header} />
                    
                    <span className="p-buttonset">
                    <Button label="AddNote" icon="pi pi-check" onClick={this.saveNote} />
                    <Button label="Cancel" icon="pi pi-times" onClick={this.cancelNote}  />
                </span>
                </div>

            </div>
        );
    }
}

export default diaryEditor;