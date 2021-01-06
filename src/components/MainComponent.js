import React, { Component } from 'react';
import 'primeflex/primeflex.css';
import DiaryEditor from "./diaryEditor";
import PreviousNotes from './previousNotes'


 

class MainComponent extends Component {

  

    render() {

      
        return (
            <div>

            <h1>Diary</h1>

            <div className="p-d-flex">
                <div className="p-mr-5">
                    <DiaryEditor />
                </div>
            <div className="p-mr-5 p-shadow-20">
                   <PreviousNotes />
            </div>

           

            </div>
                
            


            </div>
        );
    }
}

export default MainComponent;