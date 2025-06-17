import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function TinyEditor({ data, onChange }) {
    const editorRef = useRef(null);

    return (
        <Editor
            apiKey="abfauxk3v1t5394p0odjbot6rzlkzaaq6vjrl4uzqdnjrcp3" // бесплатно
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={data}
            init={{
                height: 600,
                menubar: 'file edit view insert format tools table help',
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar:
                    'undo redo | blocks | bold italic underline strikethrough | ' +
                    'forecolor backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | link image media table | code fullscreen preview',
                content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={(newContent) => {
                onChange(newContent);
            }}
        />
    );
}
