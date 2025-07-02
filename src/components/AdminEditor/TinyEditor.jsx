import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function TinyEditor({ data, onChange }) {
    const editorRef = useRef(null);

    return (
        <Editor
            apiKey="abfauxk3v1t5394p0odjbot6rzlkzaaq6vjrl4uzqdnjrcp3" // бесплатный API-ключ
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={data}
            init={{
                height: 600,
                menubar: 'file edit view insert format tools table help',
                plugins: "advlist anchor autolink autosave charmap codesample directionality help image insertdatetime link lists media nonbreaking pagebreak searchreplace table visualblocks visualchars wordcount",
                toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | align lineheight bullist numlist | indent outdent | removeformat",
                font_size_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                content_style: `
                    body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
                    img { max-width: 100% !important; height: auto !important; display: block; }
                `
            }}
            onEditorChange={(newContent) => {
                onChange(newContent);
            }}
        />
    );
}
