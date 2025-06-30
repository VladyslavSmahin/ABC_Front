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
                plugins: "advcode advlist advtable anchor autocorrect autolink autosave casechange charmap checklist codesample directionality editimage emoticons export footnotes formatpainter help image insertdatetime link linkchecker lists media mediaembed mergetags nonbreaking pagebreak permanentpen powerpaste searchreplace table tableofcontents tinymcespellchecker typography visualblocks visualchars wordcount",
                toolbar: "undo redo spellcheckdialog  | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | align lineheight checklist bullist numlist | indent outdent | removeformat typography",
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
