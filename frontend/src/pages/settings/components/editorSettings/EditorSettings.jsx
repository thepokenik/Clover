import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ComboBoxEditorTheme } from "./components/comboBoxEditorTheme/ComboBoxEditorTheme";
import { Separator } from "@/components/ui/separator";
import SelectFontFamilyEditor from "./components/SelectFontFamilyEditor/SelectFontFamilyEditor";
import CheckBoxContent from "./components/checkBoxContent/CheckBoxContent";

const EditorSettings = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : '18');
    const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') ? localStorage.getItem('fontFamily') : 'JetBrains Mono');
    const [acceptSuggestionOnEnter, setAcceptSuggestionOnEnter] = useState(localStorage.getItem('acceptSuggestionOnEnter') ? JSON.parse(localStorage.getItem('acceptSuggestionOnEnter')) : true);
    const [autoClosingBrackets, setAutoClosingBrackets] = useState(localStorage.getItem('autoClosingBrackets') ? localStorage.getItem('autoClosingBrackets') : 'languageDefined');
    const [autoClosingDelete, setAutoClosingDelete] = useState(localStorage.getItem('autoClosingDelete') ? localStorage.getItem('autoClosingDelete') : "auto");
    const [autoClosingOvertype, setAutoClosingOvertype] = useState(localStorage.getItem('autoClosingOvertype') ? localStorage.getItem('autoClosingOvertype') : "auto");
    const [autoClosingQuotes, setAutoClosingQuotes] = useState(localStorage.getItem('autoClosingQuotes') ? localStorage.getItem('autoClosingQuotes') : "languageDefined");
    const [autoIndent, setAutoIndent] = useState(localStorage.getItem('autoIndent') ? localStorage.getItem('autoIndent') : 'advanced');
    const [automaticLayout, setAutomaticLayout] = useState(localStorage.getItem('automaticLayout') ? JSON.parse(localStorage.getItem('automaticLayout')) : false);
    const [codeLens, setCodeLens] = useState(localStorage.getItem('codeLens') ? JSON.parse(localStorage.getItem('codeLens')) : true);
    const [contextmenu, setContextmenu] = useState(localStorage.getItem('contextmenu') ? JSON.parse(localStorage.getItem('contextmenu')) : true);
    const [cursorBlinking, setCursorBlinking] = useState(localStorage.getItem('cursorBlinking') ? localStorage.getItem('cursorBlinking') : "blink");
    const [cursorSmoothCaretAnimation, setCursorSmoothCaretAnimation] = useState(localStorage.getItem('cursorSmoothCaretAnimation') ? localStorage.getItem('cursorSmoothCaretAnimation') : "off");
    const [cursorStyle, setCursorStyle] = useState(localStorage.getItem('cursorStyle') ? localStorage.getItem('cursorStyle') : "line");
    const [disableLayerHinting, setDisableLayerHinting] = useState(false);
    const [disableMonospaceOptimizations, setDisableMonospaceOptimizations] = useState(false);
    const [dragAndDrop, setDragAndDrop] = useState(true);
    const [emptySelectionClipboard, setEmptySelectionClipboard] = useState(true);
    const [fixedOverflowWidgets, setFixedOverflowWidgets] = useState(false);
    const [fontLigatures, setFontLigatures] = useState(false);
    const [formatOnPaste, setFormatOnPaste] = useState(false);
    const [formatOnType, setFormatOnType] = useState(false);
    const [formatOnSave, setFormatOnSave] = useState(false);
    const [glyphMargin, setGlyphMargin] = useState(true);
    const [gotoLocation, setGotoLocation] = useState({});
    const [hideCursorInOverviewRuler, setHideCursorInOverviewRuler] = useState(false);
    const [highlightActiveIndentGuide, setHighlightActiveIndentGuide] = useState(true);
    const [hover, setHover] = useState({ enabled: true });
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [lightbulb, setLightbulb] = useState(true);
    const [lineDecorationsWidth, setLineDecorationsWidth] = useState(0);
    const [lineNumbers, setLineNumbers] = useState("on");

    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('acceptSuggestionOnEnter', acceptSuggestionOnEnter);
    localStorage.setItem('autoClosingBrackets', autoClosingBrackets);
    localStorage.setItem('autoClosingDelete', autoClosingDelete);
    localStorage.setItem('autoClosingOvertype', autoClosingOvertype);
    localStorage.setItem('autoClosingQuotes', autoClosingQuotes);
    localStorage.setItem('autoIndent', autoIndent);
    localStorage.setItem('automaticLayout', automaticLayout);
    localStorage.setItem('codeLens', codeLens);
    localStorage.setItem('contextmenu', contextmenu);
    localStorage.setItem('cursorBlinking', cursorBlinking);
    localStorage.setItem('cursorSmoothCaretAnimation', cursorSmoothCaretAnimation);
    localStorage.setItem('cursorStyle', cursorStyle);

    return (
        <article className="article-settings-content">
            <div className="div-user-content">
                <div className='my-6'>
                    <CardTitle>Editor Configuration</CardTitle>
                    <CardDescription>File Editor Settings</CardDescription>
                </div>
                <div className="user-info-image-content">
                    <div className="excel-file-generator editor-settings-menu">
                        <CardTitle>Theme Editor</CardTitle>
                        <CardDescription>Choose your editor theme color</CardDescription>
                        <Separator className="my-4" />
                        <CardContent>
                            <ComboBoxEditorTheme
                                theme={theme}
                                setTheme={setTheme}
                            />
                        </CardContent>

                        <CardTitle>Font Editor</CardTitle>
                        <CardDescription>Choose your editor font-family or font-size</CardDescription>
                        <Separator className="my-4" />
                        <CardContent>
                            <SelectFontFamilyEditor
                                fontFamily={fontFamily}
                                setFontFamily={setFontFamily}
                                fontSize={fontSize}
                                setFontSize={setFontSize}
                            />
                        </CardContent>

                        <CardTitle>Text Editor</CardTitle>
                        <CardDescription>Choose your editor font-family or font-size</CardDescription>
                        <Separator className="my-4" />
                        <CardContent>
                            <CheckBoxContent
                                setAcceptSuggestionOnEnter={setAcceptSuggestionOnEnter}
                                acceptSuggestionOnEnter={acceptSuggestionOnEnter}
                                setAutoClosingBrackets={setAutoClosingBrackets}
                                autoClosingBrackets={autoClosingBrackets}
                                setAutoClosingDelete={setAutoClosingDelete}
                                autoClosingDelete={autoClosingDelete}
                                setAutoClosingOvertype={setAutoClosingOvertype}
                                autoClosingOvertype={autoClosingOvertype}
                                setAutoClosingQuotes={setAutoClosingQuotes}
                                autoClosingQuotes={autoClosingQuotes}
                                setAutoIndent={setAutoIndent}
                                autoIndent={autoIndent}
                                setAutomaticLayout={setAutomaticLayout}
                                automaticLayout={automaticLayout}
                                setCodeLens={setCodeLens}
                                codeLens={codeLens}
                                setContextmenu={setContextmenu}
                                contextmenu={contextmenu}
                                setCursorBlinking={setCursorBlinking}
                                cursorBlinking={cursorBlinking}
                                setCursorSmoothCaretAnimation={setCursorSmoothCaretAnimation}
                                cursorSmoothCaretAnimation={cursorSmoothCaretAnimation}
                                setCursorStyle={setCursorStyle}
                                cursorStyle={cursorStyle}
                            />
                        </CardContent>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default EditorSettings;