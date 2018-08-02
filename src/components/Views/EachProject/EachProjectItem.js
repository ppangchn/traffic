import React, { Component } from 'react'
import EditTimeline from './EditTimeline'
import DeleteUser from './DeleteUser'
import './EachProjectItem.css'
class EachProjectItem extends Component {
  constructor(props) {
    super(props)
    this.state = {overflow: ''}
  }
  render() {
    const {timeline} = this.props;
    return (
      <div
        key={timeline.id}
        id={timeline.id}
        className="eachprojectitem"
      >
        <div
          className="membername"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <div style={{ width: '100%', float: 'left' }}>
            {timeline.users.name}
          </div>
          <EditTimeline
            id={timeline.id}
            start={timeline.start}
            end={timeline.end}
            updateData={this.props.updateData}
            getData={this.props.getData}
          />
          <DeleteUser
            id={timeline.id}
            name={timeline.users.name}
            roles={timeline.users.roles.name}
            getData={this.props.getData}
          />
        </div>
        <div
          className="persontagcontainer"
          id={'eachprojectmembertag' + timeline.id}
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden'
          }}
        >
          <div className="membertag">{timeline.users.roles.name}</div>
          {timeline.users.tags.map((tag,index) => {
            return (
              <div key={timeline.users.id+"at"+index} className="membertag">
                {tag.name}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
export default EachProjectItem;
