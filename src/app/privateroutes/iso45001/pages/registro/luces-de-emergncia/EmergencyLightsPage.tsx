import { useEffect, useId, useState } from "react";

import { Content } from "src/app/generalcomponents/layouts/content";
import { getPPS } from "../../epps/delivery/mock";
import { PersonalProtectiveEquipment } from "../../epps/delivery/types";
import { Table } from "../../epps/delivery/table";
import { Modal } from "../../epps/delivery/modal";
import { Navigate, Route, Routes } from 'react-router-dom'
import { PageTitle } from "src/app/generalcomponents/layouts/layoutprovider/LayoutProvider";
import { PageLink } from "src/models/layoutprovider/model";
import { CalendarWrapper } from "../../../../human-resources/tools/calendar/Calendar";
import { EmergencyLightsWrapper } from "./componets/EmergencyLightsWrapper";
// import { CalendarWrapper } from "../..app/modules/human-resources/tools/calendar/Calendar";
// import { CalendarWrapper } from './tools/calendar/Calendar'

const emergencyLightsBreadcrumbs: Array<PageLink> = [
	{
		title: "Luces de emergencia",
		path: "/iso45001/luces-de-emergencia",
		isSeparator: false,
		isActive: false,
	},
	{
		title: "",
		path: "",
		isSeparator: true,
		isActive: false,
	},
];

export const EmergencyLightsPage = (): JSX.Element => {

	return (
		<>
			<PageTitle breadcrumbs={emergencyLightsBreadcrumbs}>
				Registro luces de emergencia
			</PageTitle>
			<EmergencyLightsWrapper />
		</>
	);
};
