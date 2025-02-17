import { Box, Button, Divider, Grid, Group, Space, Title } from "@mantine/core";
import Editor from "@monaco-editor/react";
import "jsoneditor-react/es/editor.min.css";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { RiAddCircleFill, RiPlayCircleFill, RiToolsFill } from "react-icons/ri";
import styles from "../styles/Home.module.css";
import AddComponentModal from "./components/AddComponentModal";

export default function Home() {
  const jscAppRef = useRef<any>();
  const [value, setValue] = useState("");
  const [showAddComponentModal, setShowAddComponentModal] = useState(false);
  const runButtonRef = useRef<HTMLButtonElement>(null);

  const monacoRef = useRef(null);

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    editor.addAction({
      id: "run-code",
      label: "Run Code",
      precondition: null,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR],
      keybindingContext: null,
      run: function () {
        runButtonRef?.current?.click();
      },
    });

    monacoRef.current = editor;
  }

  const runCode = useCallback(() => {
    if (value && jscAppRef?.current) {
      jscAppRef?.current?.setMarkup(JSON.parse(value));
    }
  }, [jscAppRef, value]);

  const formatCode = () => {
    if (monacoRef?.current) {
      monacoRef?.current.getAction("editor.action.formatDocument").run();
    }
  };

  const onInsertComponent = (component: any) => {
    // remove the last square bracket
    setValue((value) => value.slice(0, value.length - 1));

    // add a square bracket to the beginning
    if (value[0] !== "[") {
      setValue((value) => "[" + value);
    }

    if (value.includes("}")) {
      setValue((value) => value + ",");
    }

    setValue((value) => {
      let newValue = "\n" + value + JSON.stringify(component) + "\n]";

      return newValue;
    });

    formatCode();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Jaseci Webkit Playground</title>
        <meta name="description" content="generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="module"
          src={`${process.env.NEXT_PUBLIC_WEBKIT_URL}/components.esm.js`}
          async
        ></script>
        <script
          noModule
          src={`${process.env.NEXT_PUBLIC_WEBKIT_URL}/components.js`}
          async
        ></script>
        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_WEBKIT_URL}/components.css`}
        />
      </Head>

      <main>
        <Grid sx={{ padding: 10 }}>
          <Grid.Col span={6}>
            <Divider></Divider>
            <Space h="md"></Space>
            <Group>
              <Title order={3}>Editor</Title>
              <Button
                onClick={formatCode}
                variant="outline"
                leftIcon={<RiToolsFill />}
                size="xs"
              >
                Format
              </Button>

              <Button
                size="xs"
                leftIcon={<RiAddCircleFill></RiAddCircleFill>}
                onClick={() => setShowAddComponentModal(true)}
                variant="outline"
              >
                Add Component
              </Button>

              <Button
                size="xs"
                onClick={runCode}
                leftIcon={<RiPlayCircleFill />}
                ref={runButtonRef}
              >
                Run
              </Button>
            </Group>
            <Space h="md"></Space>
            <Divider></Divider>
            <Space h="md"></Space>

            <Editor
              height="400px"
              defaultLanguage="json"
              theme="vs-dark"
              options={{ formatOnType: true, formatOnPaste: true }}
              defaultValue=""
              value={value}
              onChange={setValue}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <div>
              <Divider></Divider>
              <Space h="md"></Space>
              <Title order={3}>Preview</Title>
              <Space h="md"></Space>
              <Divider></Divider>
              <Space h="md"></Space>

              <Box sx={{ background: "#fff", minHeight: "400px" }}>
                <jsc-app ref={jscAppRef}></jsc-app>
              </Box>
            </div>
          </Grid.Col>
        </Grid>
      </main>
      <AddComponentModal
        opened={showAddComponentModal}
        setOpened={setShowAddComponentModal}
        onInsertComponent={onInsertComponent}
      ></AddComponentModal>
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "jsc-app": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >; // Normal web component
    }
  }
}
