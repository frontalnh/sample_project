import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }

      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      input,
      textarea,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
        vertical-align: baseline;
        box-sizing: border-box;
      }
      #__next {
        background-color: #ffffff;
      }
      html,
      body {
        background-color: #ffffff;
        color: #000000;
      }
      html {
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none; /* 인터넷 익스플로러 */
        scrollbar-color: rgb(32, 32, 32, 0.6) rgb(32, 32, 32, 0.4);
        scrollbar-width: thin !important; /* 파이어폭스 */
      }
      ::-webkit-scrollbar {
        /* width: 0px;  */
        /* Remove scrollbar space */
        /* background: transparent */
        /* Optional: just make scrollbar invisible */
      }
      ::-webkit-scrollbar-thumb {
        height: 30%;
        background: rgb(32, 32, 32, 0.6);
        /* background: transparent */
        /* Optional: show position indicator in red */
        border-radius: 10px;
      }
      ::-webkit-scrollbar-track {
        background: rgb(32, 32, 32, 0.2); /*스크롤바 뒷 배경 색상*/
      }
      ol,
      ul,
      li {
        list-style: none;
      }
      a {
        background-color: transparent;
        text-decoration: none;
        outline: none;
        color: inherit;
        &:active,
        &:hover {
          text-decoration: none;
          color: inherit;
          outline: 0;
        }
      }

      input:focus::placeholder {
        color: transparent;
      }
      input:focus {
        outline: none;
      }
      textarea:focus {
        outline: none;
      }

      /* Change the color to your own background color */
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        background-color: transparent;
        transition: background-color 5000s ease-in-out 0s;
        -webkit-transition: background-color 9999s ease-out;
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #000 !important;
      }

      input:autofill,
      input:autofill:hover,
      input:autofill:focus,
      input:autofill:active {
        background-color: transparent;
        -webkit-text-fill-color: #000;
        -webkit-box-shadow: 0 0 0px 1000px #000 inset;
        box-shadow: 0 0 0px 1000px #000 inset;
        transition: background-color 5000s ease-in-out 0s;
      }

      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .sr-only {
        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        height: 1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        width: 1px !important;
        white-space: nowrap !important;
      }
    `}
  />
);
export default GlobalStyle;
