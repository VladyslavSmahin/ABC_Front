import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Alignment,
	AutoImage,
	AutoLink,
	Autosave,
	Bold,
	Bookmark,
	Code,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	HorizontalLine,
	HtmlComment,
	HtmlEmbed,
	ImageBlock,
	ImageInsertViaUrl,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	Paragraph,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableLayout,
	TableToolbar,
	TextPartLanguage,
	TodoList,
	Underline
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './MyEditor.css';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDk3NzI3OTksImp0aSI6IjdhZjI4MjVhLTkzNDctNGI1ZS1iYWUzLTgwZGUzNDM4YWQ4ZSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImUyNWYzMTk4In0.l0XVTTVIs5Tu3YrZC8lRSbabfUiV2iRa3-3IGN7tlfq2JTjD64j9q91VbdkdhktjUNyqMLfRlahXVoJjfcJ1lA';

export default function MyEditor({ data, onChange }) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);
		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = useMemo(() => {
		if (!isLayoutReady) {
			return null;
		}

		return {
			toolbar: {
				items: [
					'undo',
					'redo',
					'|',
					'textPartLanguage',
					'|',
					'style',
					'|',
					'fontSize',
					'fontFamily',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'underline',
					'strikethrough',
					'subscript',
					'superscript',
					'code',
					'|',
					'horizontalLine',
					'link',
					'bookmark',
					'insertImageViaUrl',
					'insertTable',
					'insertTableLayout',
					'htmlEmbed',
					'|',
					'alignment',
					'|',
					'bulletedList',
					'numberedList',
					'todoList',
					'outdent',
					'indent'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				Alignment,
				AutoImage,
				AutoLink,
				Autosave,
				Bold,
				Bookmark,
				Code,
				Essentials,
				FontBackgroundColor,
				FontColor,
				FontFamily,
				FontSize,
				GeneralHtmlSupport,
				HorizontalLine,
				HtmlComment,
				HtmlEmbed,
				ImageBlock,
				ImageInsertViaUrl,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				Paragraph,
				Strikethrough,
				Style,
				Subscript,
				Superscript,
				Table,
				TableLayout,
				TableToolbar,
				TextPartLanguage,
				TodoList,
				Underline
			],
			fontFamily: {
				supportAllValues: true
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true,
						attributes: true,
						classes: true
					}
				]
			},
			image: {
				toolbar: ['imageTextAlternative', '|', 'imageStyle:alignBlockLeft', 'imageStyle:block', 'imageStyle:alignBlockRight'],
				styles: {
					options: ['alignBlockLeft', 'block', 'alignBlockRight']
				}
			},
			initialData:
				'welcome to editor/ require input',
			licenseKey: LICENSE_KEY,
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			menuBar: {
				isVisible: true
			},
			placeholder: 'Type or paste your content here!',
			style: {
				definitions: [
					{
						name: 'Article category',
						element: 'h3',
						classes: ['category']
					},
					{
						name: 'Title',
						element: 'h2',
						classes: ['document-title']
					},
					{
						name: 'Subtitle',
						element: 'h3',
						classes: ['document-subtitle']
					},
					{
						name: 'Info box',
						element: 'p',
						classes: ['info-box']
					},
					{
						name: 'CTA Link Primary',
						element: 'a',
						classes: ['button', 'button--green']
					},
					{
						name: 'CTA Link Secondary',
						element: 'a',
						classes: ['button', 'button--black']
					},
					{
						name: 'Marker',
						element: 'span',
						classes: ['marker']
					},
					{
						name: 'Spoiler',
						element: 'span',
						classes: ['spoiler']
					}
				]
			},
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableType']
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div
				className="editor-container editor-container_classic-editor editor-container_include-style"
				ref={editorContainerRef}
			>
				<div className="editor-container__editor" ref={editorRef}>
					{editorConfig && (
						<CKEditor
							editor={ClassicEditor}
							config={editorConfig}
							data={data} // передаём текущие данные
							onChange={(event, editor) => {
								const newData = editor.getData();
								onChange(newData);
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
