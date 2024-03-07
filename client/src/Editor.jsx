import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blackquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function Editor({ value, onChange }) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme={"snow"}
      modules={modules}
      formats={formats}
    />
  );
}
