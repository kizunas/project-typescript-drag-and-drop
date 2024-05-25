class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; // テンプレート要素への参照
    this.hostElement = document.getElementById('app')! as HTMLDivElement; // templateを表示する親要素への参照
    

    // テンプレートのインポートをする。
    // importNodeメソッドを使用する。別のドキュメントからノード（要素、属性、テキストなど）を現在のドキュメントにインポートするために使用されるDOMメソッドです。このメソッドは、ノードをコピーして新しいドキュメントに追加するのに便利です。
    // this.templateElement.contentを渡すことでテンプレートタグの内側にあるタグ（formタグ)を参照する。
    // importNodeの第二引数はhtmlタグの最初の階層だけではなく、その下の階層も含めてインポートするというもの
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement; // formタグを指す
    this.element.id = 'user-input'; // cssのuser-inputを当てる

    // formへの入力項目を取得する。
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector('#mandaye') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private submitHundler(event: Event) {
    event.preventDefault(); // Http requestが送られないように
    console.log(this.titleInputElement.value);
  }

  private configure() {
    // bind(this)でsubmitHundler内でthisを使えるようにしている。
    this.element.addEventListener('submit', this.submitHundler.bind(this))
  }

  private attach() { // hostElementに要素を追加する。
    // insertAdjacentElementはブラウザのJavaScriptで提供されているもの。HTML文書の既存の要素に対して新しい要素を特定の位置に挿入するためのDOMメソッドです。これにより、指定した要素の前後や内部の特定の位置に新しい要素を簡単に追加することができます。
    // 最初の引数はどこに追加するかのオプション。
    // afterbeginは開始タグの後ろ、afterendは終了タグの後ろ、beforebeginは開始タグの前、beforeendは終了タグの前。
    // 第二引数に挿入したい要素を渡す
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();