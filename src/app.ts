// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) { // decoratorは関数
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn;
    }
  }
  return adjDescriptor;
}


// ProjectInput class
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
    this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;
    if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredManday.trim().length === 0) {
      alert('入力値が正しくありません。再度お試しください。');
      return;
    } else {
      // +をつけることでNumberに変換している。
      return [enteredTitle, enteredDescription, +enteredManday]
    }
  }
  
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.mandayInputElement.value = '';
  }

  @autobind
  private submitHundler(event: Event) {
    event.preventDefault(); // Http requestが送られないように
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      console.log(title, desc, manday);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHundler)
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