import  { useState } from "react";
import { Appbar } from "../components/Appbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Publish() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate()

  function handleOnChangeContent(event: any, editor: any) {
    setContent(editor.getData());
  }

  async function publishBlog() {
    //get content and title. make axios post call on url. pass this function to the Appbar publish button onClick
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    navigate(`/blogs`)
    
  }

  return (
    <>
      <Appbar username="A" isDraft={true}  publishFunction={publishBlog}/>
      <div className="sm:mx-auto sm:max-w-screen-lg sm:px-5  mx-4 flex flex-col gap-2 ">
        <label className="block  text-xl capitalize font-medium text-gray-600 ">
          Blog Title
        </label>
        <input
          type="text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          placeholder="Enter your blog title here"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />

        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "|",
              "link",
              "insertTable",
              "mediaEmbed",
              "|",
              "bulletedList",
              "numberedList",
              "indent",
              "outdent",
            ],
            plugins: [
              Bold,
              Essentials,
              Heading,
              Indent,
              IndentBlock,
              Italic,
              Link,
              List,
              MediaEmbed,
              Paragraph,
              Table,
              Undo,
            ],
            initialData: "<h1>Start your blog editing here!</h1><br/>",
          }}
          onChange={handleOnChangeContent}
        />
      </div>
    </>
  );
}

export default Publish;
