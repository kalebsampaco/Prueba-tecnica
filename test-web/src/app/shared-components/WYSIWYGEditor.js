import { forwardRef, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import md5 from "md5";
import { deleteFile, uploadFile } from "app/utils/uploadFile";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import clsx from "clsx";
import { padding } from "@mui/system";
import API from "app/services/constants/api";
import { showMessage } from "app/store/fuse/messageSlice";
import TramSevenRequesterView2 from "app/main/apps/tramitesAmbientales/default/common/views/requester/TramSevenRequesterView2";

const Root = styled("div")({
  "& .rdw-dropdown-selectedtext": {
    color: "inherit",
  },
  "& .rdw-editor-toolbar": {
    borderWidth: "0 0 1px 0!important",
    margin: "0!important",
  },

  "& .rdw-editor-main": {
    padding: "8px 12px",
    height: "100%",
    maxHeight: 272,
  },
});

const WYSIWYGEditor = forwardRef((props, ref) => {
  const { editorState, setEditorState, onChange, html, itemSolicitud } = props;
  const [urlImgen, setUrlImgen] = useState("");
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      if (html) {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState2 = EditorState.createWithContent(contentState);
          setEditorState(editorState2);
        }
      }
    }
    fetch();
  }, [setEditorState, html]);

  function onEditorStateChange(_editorState) {
    setEditorState(_editorState);

    return onChange(
      draftToHtml(convertToRaw(_editorState.getCurrentContent()))
    );
  }

  const handleUploadChange = async (file) => {
    if (file?.size > 5000000) {
      dispatch(
        showMessage({
          message: "El archivo es demasiado grande (máximo 5 MB)",
          variant: "error",
        })
      );
      return;
    }
    let valorUrl = "";
    let valorUrlTwo = "";
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async () => {
      const data = {
        file,
        name_archivo: `${md5(Date.now())}.jpeg`,
        url_base64: `data:${file.type};base64,${btoa(reader.result)}`,
      };
      // ----------------------------------------------------------------------

      const url = `images/${itemSolicitud?.ss_id_creador}/${itemSolicitud?.ss_id}`;

      // ----------------------------------------------------------------------
      const result = await uploadFile(url, data);

      if (result?.$response?.httpResponse?.statusCode === 200) {
        valorUrl = `${API.url_bucket}/${url}/${data.name_archivo}`;

        valorUrlTwo = { data: { link: valorUrl } };

        return valorUrlTwo;
      } else {
        dispatch(
          showMessage({
            message: "Error al cargar la imagen",
            variant: "error",
          })
        );
        return;
      }
    };
    const respuesta = await reader.onload();
    return await respuesta;
  };

  return (
    <Root
      className={clsx("rounded-4 border-1 w-full h-full", props.className)}
      ref={ref}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        // toolbarClassName="toolbar-class"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: handleUploadChange,
            // alt: { present: true, mandatory: true },
            defaultSize: {
              height: "300",
              width: "300",
            },
            uploadEnabled: true,
            urlEnabled: true,
            previewImage: true,
          },
        }}
        // toolbarStyle={(paddingBottom = 20)}
      />
    </Root>
  );
});

export default WYSIWYGEditor;
