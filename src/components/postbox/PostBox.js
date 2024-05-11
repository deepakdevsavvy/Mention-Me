
import React, { useState, useEffect } from 'react';
import "../postbox/postBox.css";


function PostBox() {
    const [postContent, setPostContent] = useState('');
    const [mentions, setMentions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [postedMessages, setPostedMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [mentionIndex, setMentionIndex] = useState(-1); // Track position of "@" symbol

    const users = [
        { id: 1, username: 'Arjuna', status: 'Online' },
        { id: 2, username: 'Baily', status: 'Away' },
        { id: 3, username: 'Caroline', status: 'Offline' },
        { id: 4, username: 'Dhee', status: 'Offline' },
        { id: 5, username: 'Divi', status: 'Offline' },
        { id: 6, username: 'Elisha', status: 'Offline' },
        { id: 7, username: 'Freya', status: 'Offline' },
        { id: 8, username: 'Hendrix', status: 'Offline' },
        { id: 9, username: 'Lucy', status: 'Offline' },
        { id: 10, username: 'Navy', status: 'Offline' },
        { id: 11, username: 'Priya', status: 'Offline' },
        { id: 12, username: 'Quiency', status: 'Offline' },
        { id: 13, username: 'Swaathi', status: 'Offline' },
        { id: 14, username: 'Tesla', status: 'Offline' },
        { id: 15, username: 'Victoria', status: 'Offline' },
        { id: 16, username: 'Yasmine', status: 'Offline' }
    ];

    useEffect(() => {
        if (showDropdown) {
            const filtered = users.filter(user =>
                user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, showDropdown, users]);

    const handlePost = () => {
        const newPost = {
            content: postContent,
            sender: 'D',
            time: new Date().toLocaleTimeString(),
        };
        setPostedMessages([...postedMessages, newPost]);
        setShowDropdown(false);
        setPostContent('');
        setMentions([]);
        setSelectedUser(null);
        setMentionIndex(-1); 
    };

    const handleInputChange = (e) => {
        const content = e.target.value;
        setPostContent(content);

        const index = content.lastIndexOf('@');
        if (index !== -1) {
            setShowDropdown(true);
            setMentionIndex(index);
            const searchTerm = content.substring(index + 1);
            setSearchTerm(searchTerm);
        } else {
            setShowDropdown(false);
            setSearchTerm('');
        }
    };

    const handleUserClick = (username) => {
        setShowDropdown(false);
        setSelectedUser(username);
        const newContent =

            postContent.substring(0, mentionIndex) + ' ' + username + ' ' + postContent.substring(mentionIndex + 1);
        setPostContent(newContent);
        setMentionIndex(-1); 
    };



    return (
        <div>
            <div className='textBox'>
                <textarea
                    value={postContent}
                    onChange={handleInputChange}
                    placeholder="Create a post ..."
                />
                {showDropdown && (
                    <div className="mention-dropdown">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="search users..."
                        />

                        <ul className="custom-bullet">
                            {filteredUsers.map((user) => (
                                <li key={user.id} onClick={() => handleUserClick(user.username)} data-initial={user.username.charAt(0).toUpperCase()}>
                                    {user.username}
                                </li>
                            ))}
                        </ul>

                    </div>
                )}
            </div>
            <button onClick={handlePost}>Post</button>
            {selectedUser && (
                <div className="user-status">
                    <p>
                        {selectedUser} is{' '}
                        {users.find((user) => user.username === selectedUser).status}
                    </p>
                </div>
            )}
            {postedMessages.map((message, index) => (
                <div className='result'><div key={index} className="posted-message">
                    <p className='message'>{message.content}</p>
                    <p className='sender'>{message.sender}</p>
                    <p className='time'>{message.time}</p>
                </div></div>
            ))}
        </div>
    );
}

export default PostBox;