import React, { Component } from 'react';
import { db } from '../../../firebase/firebase';
import { Link } from 'react-router-dom';
let searchUsers = [];

export default class UsersList extends Component {
  state = {
    searchInput: '',
    users: [],
  };

  handelChange = (e) => {
    const key = e.target.value;
    this.setState({
      searchInput: key,
    });
    searchUsers =
      key !== ''
        ? this.state.users.filter((el) =>
            el.userName.toLowerCase().includes(key.toLowerCase())
          )
        : [];
  };
  componentDidMount() {
    document.getElementById('search-inp').focus();
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            users: [...this.state.users, doc.data()],
          });
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  render() {
    return (
      <div className="outer-feild" onClick={this.props.setSearch}>
        <div
          className="search-feild"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="container-fluid">
            <div className="d-flex flex-column align-items-center">
              <input
                className="form-control mb-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.searchInput}
                onChange={this.handelChange}
                id="search-inp"
              />
              {/* <div className="pointer"></div> */}
              {this.state.searchInput && (
                <div className="user-search shadow mt-3">
                  <ul className="list-group container">
                    {searchUsers.length > 0 ? (
                      searchUsers.map((el) => {
                        return (
                          <li
                            className="list-group-item d-flex px-5"
                            key={el.userName}
                          >
                            <img
                              src={el.imageUrl}
                              className="mr-3 rounded-circle shadow"
                              alt={el.userName}
                              width="50px"
                              height="50px"
                            />
                            <div className="">
                              <a
                                className="h5"
                                href={el.userName}
                                // target="_blank"
                                onClick={this.props.setSearch}
                                // rel="noreferrer"
                              >
                                {el.userName}
                              </a>
                              <br />
                              {el.firstName} {el.lastName}
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <>
                        <li
                          className="list-group-item d-flex justify-content-center align-items-center text-white"
                          style={{
                            height: '200px',
                            backgroundColor: '#00000083',
                          }}
                        >
                          No User Found !
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
