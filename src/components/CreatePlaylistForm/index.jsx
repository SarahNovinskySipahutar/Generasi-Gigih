import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from "../../lib/spotifyAPI";
import { toast } from "react-toastify";
import {
	Flex,
	Heading,
	FormControl,
	Input,
	Center,
	Button,
} from "@chakra-ui/react";

export default function CreatePlaylistForm({ uriTracks }) {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const userId = useSelector((state) => state.auth.user.id);
	const [form, setForm] = useState({
		title: "",
		description: "",
	});
	const [errorForm, setErrorForm] = useState({
		title: "",
		description: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		setErrorForm({ ...errorForm, [name]: "" });
	};
	const validateForm = () => {
		let isValid = true;
		if (form.title.length < 5) {
			setErrorForm({
				...errorForm,
				title: "Title must be at least 10 characters long",
			});
			isValid = false;
		}
		return isValid;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				const responseCreatePlaylist = await createPlaylist(
					accessToken,
					userId,
					{
						name: form.title,
						description: form.description,
					}
				);
				await addTracksToPlaylist(
					accessToken,
					responseCreatePlaylist.id,
					uriTracks
				);
				toast.success("Playlist created successfully");
				setForm({ title: "", description: "" });
			} catch (error) {
				toast.error(error);
			}
		}
	};

	return (
		<Center>
			<Flex direction="column" pt={5} pb={5}>
				<Heading as="h2" size="xl" color="white">
					Create Playlist
				</Heading>

				<form onSubmit={handleSubmit}>
					<FormControl mt={5}>
						<Input
							w="400px"
							placeholder="Add a title here"
							bgColor="white"
							focusBorderColor="green.400"
							borderRadius="25"
							value={form.title}
							id="title-playlist"
							name="title"
							onChange={handleChange}
							error={errorForm.title}
							required
						/>
					</FormControl>
					<FormControl mt={5}>
						<Input
							w="400px"
							placeholder="Add a description here"
							bgColor="white"
							focusBorderColor="green.400"
							borderRadius="25"
							value={form.description}
							id="description-playlist"
							name="description"
							onChange={handleChange}
							error={errorForm.description}
							required
						/>
					</FormControl>
					<Button
						bgColor="green.500"
						color="white"
						_focus={{ boxShadow: "none" }}
						_hover={{ bgColor: "green.400" }}
						borderRadius="25"
						mt={5}
						type="submit"
					>
						Create
					</Button>
				</form>
			</Flex>
		</Center>
	);
}