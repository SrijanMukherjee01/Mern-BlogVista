import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

async function createNewPost(ev){
    ev.preventDefault();
    const data=new FormData(); 
    // It creates a new instance of the FormData object in JavaScript.
    // console.log(files);
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);

    const response=await fetch('https://mern-blogvista-2.onrender.com/post',{
        method:'POST',
        body:data,
        credentials:'include'

    });
    if(response.ok){
        setRedirect(true);
    }

}

if(redirect){
    return <Navigate to={'/'}/>
}
  return (
    
      <form action="" onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder="summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
        //   value={files}
          onChange={(ev) => setFiles(ev.target.files)}
        />
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: "5px" }}>Create Post</button>
      </form>
    
  );
}
