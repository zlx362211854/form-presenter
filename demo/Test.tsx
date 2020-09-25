import React from 'react'
import Demo1 from './demo1'
import Demo2 from './demo2'
export default class Test extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>demo1</h1>
        <Demo1/>
        <h1 style={{textAlign: 'center'}}>demo2</h1>
        <Demo2/>
      </div>
    )
  }
}
