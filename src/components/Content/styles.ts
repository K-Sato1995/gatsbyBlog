import styled from 'styled-components'
import { colors } from '../../tokens'

const ContentBody = styled.div`
  .toc ul {
    // list-style: none;
    // margin: 0px;
    // padding: 0px;
  }
  .toc > li,
  .toc > ul > li,
  .toc > ul > ul > li,
  .toc > ul > ul > ul > li,
  .toc > ul > ul > ul > ul > li,
  .toc > ul > ul > ul > ul > ul > li {
    margin-left: 35px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  .toc > li > a,
  .toc > ul > li > a,
  .toc > ul > ul > li > a,
  .toc > ul > ul > ul > li > a,
  .toc > ul > ul > ul > ul > li > a,
  .toc > ul > ul > ul > ul > ul > li > a {
    display: block;
    padding: 4px 0px;
    color: #85837a;
    text-decoration: none;
    line-height: 0.5;
  }

  .toc > li > a:hover,
  .toc > ul > li > a:hover,
  .toc > ul > ul > li > a:hover,
  .toc > ul > ul > ul > li > a:hover,
  .toc > ul > ul > ul > ul > li > a:hover,
  .toc > ul > ul > ul > ul > ul > li > a:hover {
    filter: brightness(150%);
    box-shadow: none;
  }

  line-height: 1.6;
  p {
    white-space: pre-line;
  }
  & > h1 {
    padding-top: 2rem;
    padding-bottom: 0.2em;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ececec;
    font-size: 1.5em;
  }

  & > h2 {
    padding-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.3em;
  }

  & > h3 {
    padding-top: 1rem;
    margin-bottom: 1rem;
  }

  & > p {
    margin: 1em 0 0 0;
    line-height: 1.9;
  }

  & a {
    color: #85837a;
    text-decoration: underline;
    &:hover {
      filter: brightness(150%);
      box-shadow: none;
    }

    &.anchor,
    &.gatsby-resp-image-link {
      box-shadow: none;
    }
  }

  h1 .anchor svg,
  h2 .anchor svg,
  h3 .anchor svg,
  h4 .anchor svg,
  h5 .anchor svg,
  h6 .anchor svg {
    visibility: hidden;
    margin-left: -16px;
  }

  h1:hover .anchor svg,
  h2:hover .anchor svg,
  h3:hover .anchor svg,
  h4:hover .anchor svg,
  h5:hover .anchor svg,
  h6:hover .anchor svg,
  h1 .anchor:focus svg,
  h2 .anchor:focus svg,
  h3 .anchor:focus svg,
  h4 .anchor:focus svg,
  h5 .anchor:focus svg,
  h6 .anchor:focus svg {
    visibility: visible;
  }

  & > blockquote {
    box-sizing: border-box;
    background-color: #f7f7f7;
    border-left: 5px solid rgb(244, 213, 36);
    margin: 30px 0px;
    padding: 5px 20px;
    border-radius: 0 8px 8px 0;
  }

  & > blockquote p {
    margin: 0.8em 0;
    font-style: italic;
  }

  & .gatsby-highlight {
    border-radius: 5px;
    font-size: 15px;
    line-height: 1.7;
    border-radius: 10px;
    overflow: auto;
    tab-size: 1.5em;
    margin: 1.5em -1.5em;

    @media (max-width: 500px) {
      border-radius: 0;
      margin-left: -25px;
      margin-right: -25px;
    }
  }

  & .gatsby-highlight > pre {
    border: 0;
    margin: 0;
    padding: 1;
  }

  & .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
  }

  & .gatsby-highlight-code-line {
    background-color: ${colors.highlight_code_linebg};
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid ${colors.highlight_code_bg};
  }

  & h1 > code.language-text,
  & h2 > code.language-text,
  & h3 > code.language-text,
  & h4 > code.language-text,
  & h5 > code.language-text,
  & h6 > code.language-text,
  & a > code.language-text,
  & p > code.language-text,
  & li > code.language-text,
  & em > code.language-text,
  & strong > code.language-text {
    background: ${colors.highlight_code_oneline};
    color: #eb6f6f;
    padding: 0 3px;
    padding: 0.2em 0.4em;
    font-weight: 600;
    font-size: 0.94em;
    border-radius: 0.3rem;
    word-wrap: break-word;
  }

  & code {
    word-wrap: break-word;
  }

  & table {
    margin-top: 1em;
    border-collapse: collapse;
    border-radius: 0.5em;
    overflow: hidden;

    & th,
    & td {
      padding: 0.5em;
      background: #f7f7f7;
      border-bottom: 2px solid ${colors.white};
    }
  }
`

export { ContentBody }
