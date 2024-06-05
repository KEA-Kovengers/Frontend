import { useEffect, useState, useRef } from 'react';
import { GetSocialFeed } from 'src/api/posts.api';
import { GetUserInfo } from 'src/api/user.api';

export default function useData() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Track the current page
  const [loading, setLoading] = useState(false);
  const target = useRef(null);

  // Function to fetch social feed and update state
  const getSocialFeed = (page) => {
    setLoading(true);
    GetSocialFeed(page)
      .then((res) => {
        const postsList = res.data.result.postsList.content;
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
                image: { images }, // Adjusted based on your actual image structure
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
    getSocialFeed(page); // Fetch the initial page of data
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || loading) return;
        setPage((prevPage) => prevPage + 1); // Increment the page number to fetch the next page
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
  }, [loading]);

  return [data, target];
}
