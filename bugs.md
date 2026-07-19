# one 
	const selectAvatar = (avatar) => {
		setSelectedAvatar(avatar);

		setFormData((prev) => ({
			...prev,
			avatar: avatar.url,
		}));
	};

# two 
  existsByUsername: (username) =>
    User.find({ username }),

# three 
if (!isPasswordValid) {
			throw new ApiError(
				HTTP_STATUS.UNAUTHORIZED,
				"Invalid username or password",
			);
		}

# four
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};


