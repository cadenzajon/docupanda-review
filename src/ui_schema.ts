export const uiSchema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Group',
			label: 'Driver Info',
			elements: [
				{ type: 'Control', scope: '#/properties/driverInfo/properties/name' },
				{
					type: 'Group',
					label: 'Address',
					elements: [
						{ type: 'Control', scope: '#/properties/driverInfo/properties/address/properties/street' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/address/properties/city' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/address/properties/state' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/address/properties/zipCode' },
					],
				},
				{
					type: 'Group',
					label: 'Personal Details',
					elements: [
						{ type: 'Control', scope: '#/properties/driverInfo/properties/personal/properties/sex' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/personal/properties/hair' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/personal/properties/eyes' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/personal/properties/height' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/personal/properties/weight' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/personal/properties/race' },
					],
				},
				{
					type: 'Group',
					label: 'Driver License',
					elements: [
						{ type: 'Control', scope: '#/properties/driverInfo/properties/driverLicense/properties/number' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/driverLicense/properties/state' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/driverLicense/properties/commercial' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/driverLicense/properties/insurance' },
						{ type: 'Control', scope: '#/properties/driverInfo/properties/driverLicense/properties/birthDate' },
					],
				},
			],
		},
		{
			type: 'Group',
			label: 'Vehicle Info',
			elements: [
				{ type: 'Control', scope: '#/properties/vehicleInfo/properties/owner' },
				{
					type: 'Group',
					label: 'Vehicle',
					elements: [
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/license' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/state' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/regExp' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/year' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/make' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/model' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/bodyStyle' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/color' },
						{ type: 'Control', scope: '#/properties/vehicleInfo/properties/vehicle/properties/type' },
					],
				},
			],
		},
		{
			type: 'Group',
			label: 'Citation Info',
			elements: [
				{ type: 'Control', scope: '#/properties/citationInfo/properties/citationId' },
				{ type: 'Control', scope: '#/properties/citationInfo/properties/reasonForStop' },
				{
					type: 'Group',
					label: 'Violation',
					elements: [
						{ type: 'Control', scope: '#/properties/citationInfo/properties/violation/properties/date' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/violation/properties/time' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/violation/properties/dayOfWeek' },
					],
				},
				{
					type: 'Group',
					label: 'Speed',
					elements: [
						{ type: 'Control', scope: '#/properties/citationInfo/properties/speed/properties/approxSpeed' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/speed/properties/maxSpeed' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/speed/properties/maxSpeedUnit' },
					],
				},
				{ type: 'Control', scope: '#/properties/citationInfo/properties/locationOfViolation' },
				{ type: 'Control', scope: '#/properties/citationInfo/properties/cityCountyOfOccurrence' },
				{ type: 'Control', scope: '#/properties/citationInfo/properties/beat' },
				{ type: 'Control', scope: '#/properties/citationInfo/properties/area' },
				{ type: 'Control', scope: '#/properties/citationInfo/properties/permArea' },
				{
					type: 'Group',
					label: 'Officer',
					elements: [
						{ type: 'Control', scope: '#/properties/citationInfo/properties/officer/properties/name' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/officer/properties/id' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/officer/properties/date' },
					],
				},
				{
					type: 'Group',
					label: 'Court',
					elements: [
						{ type: 'Control', scope: '#/properties/citationInfo/properties/court/properties/respondByDate' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/court/properties/appearInCourt/properties/time' },
						{ type: 'Control', scope: '#/properties/citationInfo/properties/court/properties/appearInCourt/properties/phone' },
						{
							type: 'Control',
							scope: '#/properties/citationInfo/properties/court/properties/appearInCourt/properties/website',
						},
						{
							type: 'Control',
							scope: '#/properties/citationInfo/properties/court/properties/appearInCourt/properties/address/properties/street',
						},
						{
							type: 'Control',
							scope: '#/properties/citationInfo/properties/court/properties/appearInCourt/properties/address/properties/city',
						},
						{
							type: 'Control',
							scope: '#/properties/citationInfo/properties/court/properties/appearInCourt/properties/address/properties/state',
						},
						{
							type: 'Control',
							scope: '#/properties/citationInfo/properties/court/properties/appearInCourt/properties/address/properties/zipCode',
						},
					],
				},
			],
		},
	],
}
