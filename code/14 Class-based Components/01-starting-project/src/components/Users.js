import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
  }

  // 없는 유저를 검색하면 에러가 발생한다.
  // 애플리케이션 전체가 중단되어 버린다.
  // 전체를 중단시키고 싶지 않다면 어떻게 해야 할까?
  // 일반 javascript에서는 try, catch를 사용
  // jsx코드에서는 try, catch를 사용할 수 없다.
  // 대신에 이럴 경우 Error Boundary라는 것을 만들어서 처리할 수 있다.
  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");
    }
  }

  toggleUsersHandler() {
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;
