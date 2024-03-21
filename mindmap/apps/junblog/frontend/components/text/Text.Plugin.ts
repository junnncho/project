'use-client';
import { ImageToolTune } from './Text.ImageTool';
import { ToolConstructable } from '@editorjs/editorjs';
import { env } from '@junblog/frontend/env/env';
import AIText from '@alkhipce/editorjs-aitext';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import CheckList from '@editorjs/checklist';
import ColorPlugin from 'editorjs-text-color-plugin';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import IndentTune from 'editorjs-indent-tune';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import TextVariantTune from '@editorjs/text-variant-tune';
import Title from 'title-editorjs';
import Underline from '@editorjs/underline';
import editorjsCodeflask from '@calumk/editorjs-codeflask';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  textVariant: TextVariantTune,
  marker: Marker,
  delimiter: Delimiter,
  list: {
    class: List,
    inlineToolbar: true,
  },
  anyTuneName: {
    class: AlignmentTuneTool,
    config: {
      default: 'left',
    },
  },
  underline: Underline,
  // image2: {
  //   class: InlineImage,
  //   inlineToolbar: true,
  //   tunes: ["imageTune"],
  //   config: {
  //     embed: {
  //       display: true,
  //     },
  //     unsplash: {
  //       appName: "your_app_name",
  //       clientId: "your_client_id",
  //     },
  //   },
  // },
  linkTool: LinkTool,
  imageTune: ImageToolTune,
  image: {
    tunes: ['imageTune'],
    class: ImageTool,

    config: {
      endpoints: {
        byFile: `${env.endpoint}/file/uploadFile`, // Your backend file uploader endpoint
        byUrl: `${env.endpoint}/file/fetchUrl`, // Your endpoint that provides uploading by Url
      },
    },
  },
  aiText: {
    class: AIText as unknown as ToolConstructable,
    config: {
      openaiKey: 'YOUR_OPEN_AI_KEY',
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  title: Title,
  header: {
    class: Header,
    inlineToolbar: true,
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  inlineCode: InlineCode,
  // simpleImage: {
  //   class: SimpleImage,
  //   tunes: ["imageTune"],
  // },
  code: editorjsCodeflask,
  indentTune: IndentTune,
  color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        '#EC7878',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#0070FF',
        '#03A9F4',
        '#00BCD4',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFF',
      ],
      defaultColor: '#FF1300',
      type: 'text',
      customPicker: false, // add a button to allow selecting any colour
    },
  },
  // Marker: {
  //   class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
  //   config: {
  //     defaultColor: "#FFBF00",
  //     type: "marker",
  //     icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
  //   },
  // },
};
