import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import md5 from 'md5';
import API from 'app/services/constants/api';
import { uploadFile } from 'app/utils/uploadFile';
import BundledEditor from './BundleEditor';

function EditorComponent(props) {
  /* Config */

  const { html, setEditorState2, editorState2, itemSolicitud, height } = props;
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  return (
    <BundledEditor
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={html}
      onEditorChange={(newValue) => {
        setEditorState2(newValue);
      }}
      init={{
        height: '100%',
        menubar: false,
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs */
        automatic_uploads: true,
        file_picker_types: 'image',
        plugins: [
          'image',
          'powerpaste',
          'casechange',
          'searchreplace',
          'autolink',
          'directionality',
          'advcode',
          'visualblocks',
          'visualchars',
          'link',
          'media',
          'mediaembed',
          'codesample',
          'table',
          'charmap',
          'pagebreak',
          'nonbreaking',
          'anchor',
          'insertdatetime',
          'advlist',
          'lists',
          'checklist',
          'wordcount',
          'tinymcespellchecker',
          'help',
          'formatpainter',
          'permanentpen',
          'charmap',
          'linkchecker',
          'emoticons',
          'advtable',
          'export',
          'autosave',
        ],
        toolbar:
          'undo redo spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat  | link image | code |table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol ',
        file_picker_callback: (cb) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', (e) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener('load', async () => {
              const base64 = reader.result.split(',')[1];

              const data = {
                file,
                name_archivo: `${md5(Date.now())}.jpeg`,
                url_base64: `data:${file.type};base64,${base64}`,
              };
              // ----------------------------------------------------------------------
              const url = `images/${itemSolicitud?.fk_creador?.usr_id}/${itemSolicitud?.aa_id_solicitud}`;

              // ----------------------------------------------------------------------
              const result = await uploadFile(url, data);
              cb(`${API.url_bucket}/${url}/${data.name_archivo}`, {
                title: file.name,
              });
            });

            reader.readAsDataURL(file);
          });

          input.click();
        },
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
}

export default EditorComponent;
