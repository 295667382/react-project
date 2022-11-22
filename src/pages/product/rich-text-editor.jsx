


import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Richtexteditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }
  constructor(props){
    super(props)
    const detail=this.props.detail
  }

  onEditorStateChange=(editorState) => {
    this.setState({
      editorState,
    },()=>{
       /*  console.log("富文本",) */
       // this.props.onCollectdetail(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
    });
    
  };
  getDetail=()=>{
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={{ border: "1px solid #d9d9d9",minHeight:'100px' }}
          
        />
        <textarea   
        disabled
        style={{width:'100%',marginTop:'10px'}}
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        />
      </div>
    );
  }
} 