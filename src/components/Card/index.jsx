import React, { useState } from "react";
import { Flex, Image, Heading, Text, IconButton } from "@chakra-ui/react";
import { FaPlus, FaTimes } from "react-icons/fa";

const Card = ({ imagesUrl, title, artist, select, toggleSelect }) => {
	const [isSelected, setIsSelected] = useState(select);
	const handleToggleSelect = () => {
		setIsSelected(!isSelected);
		toggleSelect();
	};

	return (
	
		<Flex
			min-w="280px"
			p={5}
			bgColor="whiteAlpha.50"
			borderRadius="15"
			_hover={{ bgColor: "whiteAlpha.100" }}
		>
			<Image borderRadius="15" boxSize="150px" src={imagesUrl} alt={title} />
			<Flex
				direction="column"
				alignItems="baseline"
				justifyContent="center"
				ml={5}
			>
				<Flex w="130px" h="100%" direction="column" alignItems="baseline">
					<Heading as="h2" color="white" fontSize="lg">
						{title}
					</Heading>
					<Text color="white" fontSize="lg">
						{artist}
					</Text>
				</Flex>
				<Flex w="100%" alignItems="flex-end" justifyContent="flex-end">
					<IconButton
						aria-label="Select"
						borderRadius="full"
						size="sm"
						icon={isSelected ? <FaTimes /> : <FaPlus />}
						colorScheme={isSelected ? "red" : "green"}
						_focus={{ boxShadow: "none" }}
						onClick={handleToggleSelect}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Card;