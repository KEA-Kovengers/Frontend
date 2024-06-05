import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { GetSocialFeedByHashtag } from 'src/api/posts.api';
import { GetUserInfo } from 'src/api/user.api';

export default function AppCardData1({ tag }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Track the current page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const target = useRef(null); // Target element for Intersection Observer

  // Function to fetch social feed and update state
  const getPostByTag = (page) => {
    setLoading(true);
    GetSocialFeedByHashtag(tag, page)
      .then((res) => {
        const postsList = res.data.result.postsList.content;

        if (postsList.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }

        const userPromises = postsList.map((item) => getUserinfo(item.userId));
        Promise.all(userPromises)
          .then((userResults) => {
            const transformedData = postsList.map((item, index) => {
              const userData = userResults[index];
              const datetimeString = item.created;
              const date = new Date(datetimeString);
              const formattedDate = date.toISOString().split('T')[0];
              const images = item.thumbnails;

              return {
                id: item.id,
                image: { images }, // Adjust based on your actual image structure
                info: {
                  id: item.id,
                  userImage: userData.profileImg || '/assets/images/avatars/avatar_25.jpg', // Assuming userData contains userImage
                  title: item.title,
                  userName: userData, // Assuming userData contains userName
                  date: formattedDate,
                  likeCnt: item.likeCnt,
                  commentCnt: item.commentCnt,
                },
              };
            });
            setData((prevData) => [...prevData, ...transformedData]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Function to fetch user info
  // Function to fetch user info
  const getUserinfo = (userid) => {
    if (Array.isArray(userid)) {

      return Promise.all(userid.map((id) =>
        GetUserInfo(id)
          .then((res) => res.data.result)
          .catch((err) => {
            console.log(err);
            return null; // Return null if an error occurs
          })
      ));
    } else {

      return GetUserInfo(userid)
        .then((res) => res.data.result)
        .catch((err) => {
          console.log(err);
          return null; // Return null if an error occurs
        });
    }
  };

  useEffect(() => {
    if (tag) {
      setData([]);
      setPage(0);
      setHasMore(true);
    }
  }, [tag]);

  useEffect(() => {
    if (tag && hasMore && !loading) {
      getPostByTag(page); // Fetch data when the page or tag changes
    }
  }, [tag, page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment the page number to fetch the next page
        }
      });
    });

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [loading, hasMore]);

  return [data, target, loading];
}

AppCardData1.propTypes = {
  tag: PropTypes.string.isRequired,
};
