import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from "../../lib/spotifyAPI";
import { toast } from "react-toastify";
import {
	Box,
	Flex,
	InputGroup,
	Input,
	InputLeftElement,
	Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSuccess }) => {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const [text, setText] = useState("");
	const handleInput = (e) => {
		setText(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await searchTrack(text, accessToken);
			const tracks = response.tracks.items;
			onSuccess(tracks);
		} catch (e) {
			toast.error(e);
		}
	};

	return (
		<Box alignItems="center">
			<form onSubmit={handleSubmit}>
				<Flex>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<FaSearch color="gray.300" />}
						/>
						<Input
							w="400px"
							placeholder="Search your Fav Songs..."
							type="text"
							bgColor="white"
							focusBorderColor="green.400"
							borderRadius="25"
							onChange={handleInput}
						/>
					</InputGroup>
					<Button
						bgColor="green.500"
						color="white"
						_focus={{ boxShadow: "none" }}
						_hover={{ bgColor: "green.400" }}
						borderRadius="25"
						ml={5}
						type="submit"
					>
						Search
					</Button>
				</Flex>
			</form>
		</Box>
	);
};

export default SearchBar;