import gql from "graphql-tag";

export default {
	allGovts: gql`
		query allGovernmentBasedOnCategory(
			$start: Int
			$first: Int
			$slug: categoryEnum!
		) {
			allGovernmentBasedOnCategory(start: $start, first: $first, slug: $slug) {
				_id
				name
				category
				stateGovernment
				description
				slogan
				slug
				cjn
				speaker
				leader
				senatePresident
				totalLg
				population
				totalConstituency
				infantMortalityRate
				foreignReserve
				crimeRate
				inflationRate
				budgetPerformanceRate
				budgetPassDate
				budgetSubmissionDate
				plenaryAttendanceRate
				gdpPerHead
				powerGenerated
				literacyRate
				unemploymentRate
				nonOilSectorContributionToGDP
				rulingParty
				touristAttractionCenters
				agriculture
				mineralResources
				museumsAndParks
				leaderPhoto
				senatePresidentPhoto
				cjnPhoto
				speakerPhoto
			}
		}
	`,

	allRooms: gql`
		query fetchAllConstituencyAdmin(
			$limit: Int
			$skip: Int
			$roomType: fetchConstituency
		) {
			fetchAllConstituencyAdmin(
				limit: $limit
				skip: $skip
				roomType: $roomType
			) {
				edges {
					name
					_id
					government {
						_id
						name
					}
				}
				pageInfo {
					totalCount
					hasNextPage
				}
			}
		}
	`,

	allRoomsByGovt: gql`
		query fetchConstituency(
			$roomType: fetchConstituency
			$stateGovernmentID: ID
		) {
			fetchConstituency(
				stateGovernmentID: $stateGovernmentID
				roomType: $roomType
			) {
				name
				_id
				government
			}
		}
	`,

	updateRoom: gql`
		mutation updateRoom($room: UpdateRoomInputType, $roomId: darangiGraphId) {
			updateRoom(room: $room, roomId: $roomId) {
				_id
				name
				government
			}
		}
	`,

	createRoom: gql`
		mutation createRoom($room: RoomInputType!) {
			createRoom(room: $room) {
				_id
				name
				government
			}
		}
	`,

	deleteRoom: gql`
		mutation deleteRoom($roomId: darangiGraphId) {
			deleteRoom(roomId: $roomId) {
				_id
				name
			}
		}
	`,

	allCats: gql`
		query categories {
			categories {
				id
				name
				slug
			}
		}
	`,

	createGovt: gql`
		mutation updateGovernment($id: ID!, $governmentInput: governmentInput!) {
			updateGovernment(id: $id, governmentInput: $governmentInput) {
				id
				name
				category
				stateGovernment
				description
				slogan
				slug
				cjn
				speaker
				leader
				leaderPhoto
				speakerPhoto
				senatePresidentPhoto
				cjnPhoto
				senatePresident
				totalLg
				population
				totalConstituency
				infantMortalityRate
				foreignReserve
				crimeRate
				inflationRate
				budgetPerformanceRate
				budgetPassDate
				budgetSubmissionDate
				plenaryAttendanceRate
				gdpPerHead
				powerGenerated
				literacyRate
				unemploymentRate
				nonOilSectorContributionToGDP
				rulingParty
				touristAttractionCenters
				agriculture
				mineralResources
				museumsAndParks
			}
		}
	`,

	suspend: gql`
		mutation suspendAdmin($adminId: ID!) {
			suspendAdmin(id: $adminId) {
				role
				fullName
				username
				email
				successMessage
				isSuspended
				_id
			}
		}
	`
};
