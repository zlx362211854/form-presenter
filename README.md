> FormPresenter 使用指南


### 简介

FormPresenter 是一个根据数据模型生成表单的对象（MDD）的库

### 使用场景

所有表单场景

### run demo

```shell
git clone https://github.com/zlx362211854/form-presenter.git

cd form-presenter

npm i

npm run dev
```

### 安装

```shell
npm i form-presenter
```

### 使用方法

1. 实例化 presenter

   ```tsx
   import FormPresenter from "form-presenter";
   const presenter = new FormPresenter({}); // 实例化
   ```

2. 实例化时设置表单数据模型

   ```tsx
   const presenter = new FormPresenter({
     formItems: [
       {
         label: "姓名",
         key: "name",
         uiType: "input",
         rules: [
           {
             required: true,
             message: "请输入姓名",
           },
         ],
       },
     ],
   });
   // 设置一个name字段
   ```

3. 设置表单的初始值

   ```tsx
   const presenter = new FormPresenter({
     formItems: [
       {
       label: '姓名',
       key: 'name',
       uiType: 'input',
       rules: [
         {
           required: true,
           message: '请输入姓名',
         },
       ],
     },
     ],
     initFormValues: {
       name: 'zlx' // 设置name的初始值为zlx
     }
   })
   // 在一些情景下，我们需要初始化presenter实例了以后再设置表单的初始值，这时可以在表单组件实例中将初始值作为props传入
   const presenter = new FormPresenter({
     formItems: [
       {
       label: '姓名',
       key: 'name',
       uiType: 'input', // 设置字段的ui组件为input
       rules: [
         {
           required: true,
           message: '请输入姓名',
         },
       ],
     },
     ],
     initFormValues: {} // 实例化时不设置初始值，而是在表单组件中设置
   })
   // 获取表单组件实例
   const FormComponent = presenter.getFormComponent()
   // 设置初始值
   <FormComponent
   	initFormValues={{
        name: 'zlx' // 设置name的初始值为zlx
       }}
   />
   ```

4. 获取表单组件实例并渲染

   ```tsx
   // 获取表单组件实例
   const FormComponent = presenter.getFormComponent()
   // 渲染实例
   <FormComponent {...formComponentProps}/>
   ```

   代码示例

   ```tsx
   import FormPresenter from "./FormPresenter";
   import { IFormItem } from "./declare";
   const info: IFormItem[] = [
     {
       label: "姓名",
       key: "name",
       uiType: "input", // 设置字段的ui组件为input
       rules: [
         {
           required: true,
           message: "请输入姓名",
         },
       ],
     },
   ];
   export default class Test extends React.Component {
     private presenter: FormPresenter;
     constructor(props) {
       super(props);
       this.presenter = new FormPresenter({
         formItems: info,
         initFormValues: {},
       });
     }
     render() {
       const FormComponent = this.presenter.getFormComponent();
       const formComponentProps = {
         initFormValues: {
           name: "zlx",
         },
       };
       return (
         <div title={"测试"}>
           <FormComponent {...formComponentProps} />
         </div>
       );
     }
   }
   ```

   生成组件效果：

   ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghusgbgteaj30jj04kq2q.jpg)

5. 某些情景下，我们需要在多个表单字段之间联动，如：姓名输入为“杨超越”时，年龄自动变为 18，我们可以通过监听 onValuesChange 来实现

   ```tsx
   const info: IFormItem[] = [
     {
       label: '姓名',
       key: 'name',
       uiType: 'input', // 设置字段的ui组件为input
       rules: [
         {
           required: true,
           message: '请输入姓名',
         },
       ],
     },
     {
       label: '年龄',
       key: 'age',
       uiType: 'input',
       rules: [
         {
           required: true,
           message: '请输入年龄',
         },
       ],
     },
   ]
   // ...
   constructor(props) {
       super(props)
       this.presenter = new FormPresenter({
         formItems: info,
         initFormValues: {},
         onValuesChange: ({form}, changedvalues, allValues) => {
           // reaction
           if (changedvalues && changedvalues.name) {
             if (changedvalues.name === "杨超越") {
               form.setFields({
                 age: {
                   value: 18
                 },
               })
             }
           }
         },
       })
     }
   ```

6. 某些情景下，presenter 内置的表单元素并不能满足个性化需求，这时可以通过自定义渲染来动态添加自定义表单组件

   ```tsx
   const info: IFormItem[] = [
     {
       label: "姓名",
       key: "name",
       uiType: "input", // 设置字段的ui组件为input
       rules: [
         {
           required: true,
           message: "请输入姓名",
         },
       ],
     },
   ];
   export default class Test extends React.Component {
     private presenter: FormPresenter;
     constructor(props) {
       super(props);
       this.presenter = new FormPresenter({
         formItems: info,
         initFormValues: {},
       });
     }
     add = () => {
       this.presenter.addFormItem({
         label: "描述",
         key: "desc",
         uiType: "custom", // 添加类型为自定义组件（也可以添加内置组件）
         rules: [
           {
             required: false,
             message: "",
           },
         ],
         render: this.renderDom,
       });
     };
     renderDom = React.forwardRef((props, ref) => {
       return <span ref={ref}>这是添加的自定义组件</span>;
     });
     render() {
       const FormComponent = this.presenter.getFormComponent();
       const formComponentProps = {
         initFormValues: {
           name: "zlx",
         },
       };
       return (
         <div title={"测试"}>
           <FormComponent {...formComponentProps} />
           <Button onClick={() => this.add()}>添加一个自定义组件</Button>
         </div>
       );
     }
   }
   ```

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghutuz56ygj30ix07va9x.jpg)

7. presenter 生命周期

   presenter 默认提供三个生命周期：

   - onFormCreated form 被创建时，这时 form 实例被生成, form 组件还未渲染，函数参数接受 form 实例
   - onFormMount form 组件被渲染
   - onFormDestroy form 组件被卸载

   ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghuuki0rpoj30630amwea.jpg)

8. presenter 默认提供提交按钮，有时候需要自定义提交按钮，屏蔽提交按钮只需传入：

   ```tsx
   this.presenter = new FormPresenter({
     formItems: info,
     initFormValues: {},
     disableSubmitButton: true, // 屏蔽提交按钮
   });
   ```

9. 组件布局

   默认提供两种布局

   - grid

     ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghuur5l2zkj30z707vmx6.jpg)

   - flow

     ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghuupdjf27j30g90hbt8r.jpg)

   grid 布局可以指定每个字段所占的空间：

   ```tsx
   this.presenter = new FormPresenter({
     formItems: info,
     initFormValues: {},
     formLayout: {
       type: "grid",
       col: 8, // 每个field占据8个栅格（总共24）
     },
   });
   ```

   表单默认布局为 flow 布局

### presenter 可选参数

| 参数                | 说明                          | 类型        | 默认值 | 必填 |
| :------------------ | :---------------------------- | :---------- | :----- | :--- |
| formItems           | 指定用于渲染 form 的数据      | FormItem[]  |        | 是   |
| initFormValues      | 初始化表单的值                | Object      |        | 是   |
| wrapperClassName    | 表单包围元素的 className      | string      |        | 否   |
| loading             | 显示表单的加载状态            | boolean     | false  | 否   |
| disableSubmitButton | 不展示默认表单提交按钮        | boolean     | false  | 否   |
| formLayout          | 表单的布局                    | IformLayout | 'flow' | 否   |
| onFormCreated       | 表单实例被创建的生命周期      | Function    |        | 否   |
| onFormMount         | 表单组件被加载的生命周期      | Function    |        | 否   |
| onFormDestroy       | 表单组件被销毁的生命周期      | Function    |        | 否   |
| onFieldsChange      | 表单组件 field 改变的回调     | Function    |        | 否   |
| onValuesChange      | 表单组件 field 的值改变的回调 | Function    |        | 否   |

### formItem 可选参数

| 参数          | 说明                                                   | 类型               | 默认值 | 必填 |
| :------------ | :----------------------------------------------------- | :----------------- | :----- | :--- |
| label         | 字段的 label                                           | string             |        | 是   |
| Key           | 字段在 form 中的唯一的 key                             | string             |        | 是   |
| uiType        | 字段的 ui 类型                                         | uiTypeEnums        |        | 否   |
| rules         | 字段的校验规则                                         | boolean            | false  | 否   |
| selectOptions | select 下拉类型的 option                               | IOptions           |        |      |
| radioOptions  | radioradio 类型的 option                               | IOptions           |        |      |
| min           | input number 类型的最小值                              | number             |        |      |
| max           | input number 类型的最大值                              | number             |        |      |
| prefix        | input number 类型的前缀                                | string             |        |      |
| suffix        | input number 类型的后缀                                | string             |        |      |
| step          | input number 类型的小数点后位数                        | number \| string   |        |      |
| disabled      | 是否禁用                                               | boolean            | false  |      |
| showTime      | datePicker & dateRangePicker 是否可选择时间            | boolean            | false  |      |
| format        | datePicker & dateRangePicker & timePicker 时间展示格式 | string             |        |      |
| uploadProps   | 上传组件的参数                                         | IuploadProps       |        |      |
| extra         | field 的额外注释                                       | string \| Function |        |      |
| divider       | 是否渲染横隔线                                         | Boolean            |        |      |

### IOptions 可选参数

| 参数  | 说明             | 类型   | 默认值 | 必填 |
| :---- | :--------------- | :----- | :----- | :--- |
| key   | options 的 key   | string |        | 是   |
| Title | options 的 title | string |        | 是   |

### IuploadProps 可选参数

| 参数          | 说明                            | 类型   | 默认值 | 必填 |
| :------------ | :------------------------------ | :----- | :----- | :--- |
| action        | 上传文件的地址                  | string |        | 否   |
| maxFileLength | 上传的最大文件数量              | number |        | 否   |
| fileTypes     | 上传文件的类型                  | Array  |        | 否   |
| fileSize      | 单个文件上传的限制大小 单位：MB | number | 2      | 否   |

### IformLayout 可选参数

| 参数       | 说明                                     | 类型                       | 默认值       | 必填 |
| :--------- | :--------------------------------------- | :------------------------- | :----------- | :--- |
| type       | 布局类型                                 | string，可选‘grid’和‘flow’ | flow         | 否   |
| Col        | 当 type 为 grid 时，每个 grid 占据的空间 | number                     | 8（总共 24） | 否   |
| labelCol   | 当布局为 flow 时，字段 label 占据的空间  | object                     | {span: 6}    | 否   |
| wrapperCol | 当布局为 flow 时，字段值占据的空间       | object                     | {span: 14}   | 否   |

### uiTypeEnums 可选的值

| 可选值          | 说明             |
| :-------------- | :--------------- |
| text            | 文字             |
| Info            | 文字             |
| Input           | 输入框           |
| numberInput     | 数字输入框       |
| currencyInput   | 货币输入框       |
| switch          | 开关             |
| select          | 下拉框           |
| Radio           | 单选框           |
| datePicker      | 日期选择         |
| dateRangePicker | 日期范围选择     |
| monthPicker     | 月份选择         |
| timePicker      | 时间选择         |
| upload          | 上传             |
| avatar          | 头像 \| 图片上传 |
| picturesWall    | 图片墙           |
| custom          | 自定义渲染       |

### presenter 的公共方法

1. getFormComponent 获取 form 组件实例

   ```tsx
   const presenter = new FormPresenter<IFormProps>({
         formItems: refundFormItems
       })
   render() {
     const FormComponent = presenter.getFormComponent()
     return (
       <FormComponent/>
     )
   }
   ```

2. getForm 返回 form 实例

   ```tsx
   const presenter = new FormPresenter<IFormProps>({
         formItems: refundFormItems
       })

   submit() {
     // 在表单提交的时候做校验
     const form = presenter.getForm()
     form.validateFields((err, values) => {
         if (!err) {
           console.log('Form返回的值为：', values)
         }
       })
   }
   ```

3. addFormItem 动态增加一个 form 的字段

   ```tsx
   const presenter = new FormPresenter<IFormProps>({
         formItems: refundFormItems
       })
   componentDidMount() {
     // 动态增加一个input类型的字段
     presenter.addFormItem({
         label: '身高',
         key: 'high',
         uiType: 'input', // 添加类型为input
         rules: [
           {
             required: false,
             message: '',
           },
         ]
       }, 0) // 添加为第一个字段
     // 动态增加一个自定义渲染的字段
     presenter.addFormItem({
         label: '描述',
         key: 'desc',
         uiType: 'custom', // 添加类型为自定义组件
         rules: [
           {
             required: false,
             message: '',
           },
         ],
       render: () => <span>自定义渲染的字段</span>,
       }, 2) // 添加为第三个字段
   }
   ```

4. hasField 判断表单是否含有某字段

   ```tsx
   this.presenter.hasField("name"); // true
   ```

5. getFormItems 获取表单全部字段配置

   ```tsx
   this.presenter.getFormItems();
   ```

6. updateFormItem 更新某字段

   ```tsx
   this.presenter.updateFormItem({
     key: "name",
     label: "更新--姓名",
     uiType: "input",
   });
   ```

7. resetFields 把 form 重置回初始值的状态
   ```tsx
   this.presenter.resetFields();
   ```

#### 总结

FormPresenter 是基于 ant design Form 封装的，基于模型驱动的组件，可满足日常大部分表单组件的快速开发，是模型驱动 MDD 模式下一种表单解决方案。
