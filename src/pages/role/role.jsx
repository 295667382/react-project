import React, { Component } from 'react'
import { Card } from 'antd';

export default class Role extends Component {
  render() {
    return (
      <div>
      <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{
              textAlign:'left'
            }}
          >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
      </div>
    )
  }
}
