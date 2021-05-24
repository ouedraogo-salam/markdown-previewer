let header = "# Welcome to my React Markdown Previewer!\n## This is a sub - heading...\n";
let blockQuotes = ">this is my fish Block Quotes\n>>this is a nested Block Quotes\n";
let items = "1. first Item\n2. second Item\n3. third Item\n";
let codeBlocks = "\n`<div><span>OUEDRAOGO SALAM</span></div>`\n"
let link = "\nread more about [markdown](https://www.markdownguide.org/basic-syntax/)\n";
let bold = "\nthis is my __bold text.__\n";
let code = "```\n// this is multi-line code:\nfunction anotherExample(firstLine, lastLine){\nif (firstLine == '```' && lastLine == '```') {\nreturn multiLineCode;\n}\n" +"}\n```";
let defaultContent = header + blockQuotes + items + codeBlocks + link + bold + code + "\n![salam](./horse.jpg)\n";


// react components

const documentRoot = document.getElementById("main");
class Previewer extends React.Component {
    constructor(props) {
        super(props);
    }
    previewHTML(){
       return {__html:this.props.output}
    }
    previewerClick() { 
        const previewContainer = document.querySelector(".previewer-container");
        const editorContainer = document.querySelector(".editor-container");
        previewContainer.classList.toggle("full-screen");
        if (editorContainer.classList.contains("hidden")) {
            editorContainer.classList.remove("hidden");
        } else {
            editorContainer.classList.add("hidden");
        }
        const open = previewContainer.querySelector(".open-btn").classList;
        const close = previewContainer.querySelector(".close-btn").classList;
        if (open.contains("hidden")) {
            open.remove("hidden");
            close.add("hidden");
        } else {
            open.add("hidden")
            close.remove("hidden");
        }
    }
    render() {
        return (
            <div className="previewer-container">
                    <header className="previewer-header border bg-info">
                    <span className="fs-2 text-uppercase text-white">Previewer</span>
                    <button className="previewer-btn btn fs-2" onClick={this.previewerClick}>
                            <span className="previewer-open-btn "><i className="fas fa-arrows-alt"></i></span>
                            <span className="hidden previewer-close-btn"><i className="fas fa-compress-alt"></i></span>
                        </button>
                    </header>
                    <div id="preview" className="w-100 border bg-white" dangerouslySetInnerHTML={this.previewHTML()}>
                    
                    </div>
                </div>
        )
    }
}

class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: defaultContent,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            input: e.target.value,
            });
        }
    editorClick(){
        const previewContainer = document.querySelector(".previewer-container");
        const editorContainer = document.querySelector(".editor-container");
        editorContainer.classList.toggle("full-screen");
        if (previewContainer.classList.contains("hidden")){
            previewContainer.classList.remove("hidden");
        }else{
            previewContainer.classList.add("hidden");
        }
        const open = editorContainer.querySelector(".open-btn").classList;
        const close = editorContainer.querySelector(".close-btn").classList;
        if (open.contains("hidden")){
            open.remove("hidden");
            close.add("hidden");
        }else{
            open.add("hidden")
            close.remove("hidden");
        }
    }
    
    render(){
        return (
            <div>
                <div className="editor-container">
                    <header className="editor-header border bg-info">
                        <span className="fs-2 text-uppercase text-white">Editor</span>
                        <button className="editor-btn btn fs-2" onClick={this.editorClick}>
                            <span className="open-btn "><i className="fas fa-arrows-alt"></i></span>
                            <span className="hidden close-btn "><i className="fas fa-compress-alt"></i></span>
                        </button>
                    </header>
                    <textarea onChange={this.handleChange} value={this.state.input} className="w-100" name="" id="editor" cols="30" rows="10"></textarea>
                </div>
                <Previewer output={marked(this.state.input)} />
            </div>
        )
    }
};
class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<Editor/>)
   }
}

ReactDOM.render(<App/>,documentRoot);