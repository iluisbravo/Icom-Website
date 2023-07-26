
import { useState } from 'react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, convertInchesToTwip, Header, Footer, ImageRun, PageNumber, PageBreak, ShadingType, TextWrappingType, TextWrappingSide, VerticalPositionRelativeFrom, HorizontalPositionRelativeFrom, HorizontalPositionAlign, VerticalPositionAlign } from "docx";
import React from "react";
import { Button } from "@material-ui/core";
import { saveAs } from "file-saver";
import moment from 'moment';
import 'moment/locale/es';
import CotizacionesServices from '../services/CotizacionesServices';
import Formatos from '../utils/Formatos';

const DocumentComponent = (props) => {
    const cotizacionSelected = props.cotizacionSelected;
    const btnRef = props.btnRef;
    console.log(cotizacionSelected, "COTIZACION SELECCIONADA");

    const seccionHeader = async () => {
        let docHeader = [];
        const url = "/img/logo-documento.png";

        const logoIcom = await fetch(url).then(r => r.blob());

        const tableHeader = new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"

                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                }
                            },
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.JUSTIFIED,
                                    children: [
                                        new ImageRun({
                                            data: logoIcom,
                                            transformation: {
                                                width: 650,
                                                height: 90
                                            }
                                        })
                                    ]
                                })
                            ],
                        }),
                        // new TableCell({
                        //     borders: {
                        //         top: {
                        //             style: BorderStyle.NONE,
                        //             size: 0,
                        //             color: "#000000"
                        //         },
                        //         bottom: {
                        //             style: BorderStyle.NONE,
                        //             size: 0,
                        //             color: "#000000"
                        //         },
                        //         left: {
                        //             style: BorderStyle.NONE,
                        //             size: 0,
                        //             color: "#000000"

                        //         },
                        //         right: {
                        //             style: BorderStyle.NONE,
                        //             size: 0,
                        //             color: "#000000"
                        //         }
                        //     },
                        //     children: [
                        //         new Paragraph({
                        //             alignment: AlignmentType.RIGHT,
                        //             children: [
                        //                 new TextRun({
                        //                     children: ["Folio: " + cotizacionSelected.folio],
                        //                     bold: true,
                        //                     size: 24,
                        //                     font: "Segoe UI",
                        //                 })
                        //             ]
                        //         })
                        //     ],
                        // })
                    ],
                }),
            ],
            margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
                left: convertInchesToTwip(0),
            },
        });

        docHeader = {
            default: new Header({
                children: [
                    tableHeader
                ],
            }),
        };

        return docHeader;

    }

    const seccionFooter = async () => {
        let docFooter = [];
        const urlGris = "/img/gris-pie-documento.png";
        const imgGris = await fetch(urlGris).then(r => r.blob());

        const urlNaranja = "/img/naranja-pie-documento.png";
        const imgNaranja = await fetch(urlNaranja).then(r => r.blob());

        const tableFooter = new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"

                                },
                                right: {
                                    style: BorderStyle.SINGLE,
                                    size: 1,
                                    color: "#ffffff"
                                }
                            },
                            children: [
                                new Paragraph("")
                            ],
                            shading: {
                                fill: "717276",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                            margins: {
                                top: convertInchesToTwip(0),
                                bottom: convertInchesToTwip(0),
                                left: convertInchesToTwip(1),
                                right: convertInchesToTwip(0),
                            },
                        }),
                        new TableCell({
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#ffffff"

                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 0,
                                    color: "#000000"
                                }
                            },
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    children: ["", PageNumber.CURRENT, " / ", PageNumber.TOTAL_PAGES],
                                                    bold: true,
                                                    size: 19,
                                                    font: "Segoe UI",
                                                    color: "ffffff",
                                                }),
                                            ]
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                            margins: {
                                top: convertInchesToTwip(0.2),
                                right: convertInchesToTwip(0.1),
                            },
                        })
                    ],
                }),
            ],
            margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
                left: convertInchesToTwip(0),
            },
        });

        docFooter = {
            default: new Header({
                children: [
                    tableFooter
                ],
            }),
        };

        return docFooter;

    }

    const seccionDetalleGeneral = async (detalleCotizacionSelected) => {

        let docDetalleGeneral = [];

        const tableDetalle = new Table({
            alignment: AlignmentType.CENTER,
            width: {
                size: 80,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Capacidad`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.encabezado.capacidad} ton`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Altura de Izaje`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.encabezado.alturaIzaje} metros`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Claro`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.encabezado.claro} metros`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Recorrido`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.encabezado.recorrido} metros`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Polipasto`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.polipasto.polipasto.modelo} `,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        }),
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.polipasto.polipasto.marca.marca}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Cantidad de polipastos`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.puentes}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Clasificación de grúa`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Clase C`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Grúa tipo`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Viajera`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Trabes`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.estructura.trabes ? "Incluidas" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Columnas`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.estructura.columnas ? "Incluidas" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Tirantes (patas de gallo)`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.estructura.patasGallo ? "Incluidas" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Electrificación en puente`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.electrificacionPuente ? "Incluido" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Electrificación de Recorrido`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.electrificacionRecorrido ? "Incluido" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Botonera alámbrica`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.accesorios?.conceptos?.find(c => c.nombre === "Botonera alambrica") ? "Incluida" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Botonera inalámbrica`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.accesorios?.conceptos?.find(c => c.nombre === "Botonera inalambrica") ? "Incluida" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Alarma audiovisual`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${detalleCotizacionSelected.puente.accesorios?.conceptos?.find(c => c.nombre === "Alarma audiovisual") ? "Incluida" : "No Incluye"}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Sensores`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `De limite en trole y puente`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Anclaje`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Químico epóxico`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Memoria estructural`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Incluida`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Garantía`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `1 año contra defecto de fábrica`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Instalación`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Incluido, Proyecto llave en mano`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Planos y dossier de calidad`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]

                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Incluido`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
            ],
            margins: {
                top: convertInchesToTwip(0.05),
                bottom: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.05),
                left: convertInchesToTwip(0.05),
            },
        });

        const tableMedidas = new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Capacidad`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Claro`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Recorrido`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Altura Total`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Altura Izaje`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${cotizacionSelected.capacidad} ton`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${cotizacionSelected.claro} mts`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${cotizacionSelected.recorrido} mts`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${cotizacionSelected.alturaTotal} mts`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${cotizacionSelected.alturaIzaje} mts`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        })
                    ],
                }),
            ],
            margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.1),
            },
        });

        const tableColumnas = new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Columnas`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Altura Columna`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Distancia Columnas`,
                                            bold: true,
                                            size: 19,
                                            font: "Segoe UI",
                                            color: "ffffff"
                                        })
                                    ]
                                })
                            ],
                            shading: {
                                fill: "f05522",
                                type: ShadingType.CLEAR,
                                color: "auto",
                            },
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${cotizacionSelected.columnas}`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${Number(cotizacionSelected.alturaColumnas).toFixed(2)} mts`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${cotizacionSelected.distanciaColumnas} mts`,
                                            bold: false,
                                            size: 19,
                                            font: "Segoe UI"
                                        })
                                    ]
                                })
                            ],
                        }),
                    ],
                }),
            ],
            margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.1),
            },
        });

        const getPuentesTable = () => {
            const headerRowPuentes = new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `Puente`,
                                        bold: true,
                                        size: 19,
                                        font: "Segoe UI"
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `Plipasto`,
                                        bold: true,
                                        size: 19,
                                        font: "Segoe UI"
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `Trole`,
                                        bold: true,
                                        size: 19,
                                        font: "Segoe UI"
                                    })
                                ]
                            })
                        ],
                    }),
                ],
            });

            if (cotizacionSelected.puentes) {
                const rows = cotizacionSelected.puentes.map((pt, ix) => {
                    return new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: `${ix + 1}`,
                                                bold: false,
                                                size: 19,
                                                font: "Segoe UI"
                                            })
                                        ]
                                    })
                                ],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: `${pt.polipastoMarca}`,
                                                bold: false,
                                                size: 19,
                                                font: "Segoe UI"
                                            })
                                        ]
                                    })
                                ],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: `${pt.troleMarca}`,
                                                bold: false,
                                                size: 19,
                                                font: "Segoe UI"
                                            })
                                        ]
                                    })
                                ],
                            }),
                        ],
                    })
                })

                return [headerRowPuentes, ...rows];
            }
            else {
                return [headerRowPuentes];
            }
        }

        const tablePuentes = new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: getPuentesTable(),
            margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.1),
            },
        });

        docDetalleGeneral = [
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: `${moment(detalleCotizacionSelected.encabezado.fecha).locale('es').format('DD/MMM/yyyy HH:mm')}`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: `Cotización: `,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080",
                    }),
                    new TextRun({
                        text: `${detalleCotizacionSelected.encabezado.folio}`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080",
                        underline: {},
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Contacto: `,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    }),
                    new TextRun({
                        text: `${detalleCotizacionSelected.encabezado.cliente.contacto}`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080",
                        underline: {},
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Empresa: `,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    }),
                    new TextRun({
                        text: `${detalleCotizacionSelected.encabezado.cliente.nombre}`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080",
                        underline: {},
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `GRÚA VIAJERA AUTO SOPORTADA `,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "0070c0"
                    }),
                    new TextRun({
                        text: `${cotizacionSelected.capacidad} TONELADA(S)`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "0070c0",
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 44,
                        font: "Segoe UI",
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `ALCANCE GENERAL:`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            tableDetalle,
            // new Paragraph({
            //     alignment: AlignmentType.LEFT,
            //     children: [
            //         new TextRun({
            //             text: `Este documento es confidencial lo cual significa no puede ser usado para cualquier caso y cualquier movimiento, los documentos son meramente para uso exclusivo de la empresa ICOM S.A de C.V. Los derechos son totalmente reservados por la empresa mencionada y no pueden hacerse responsable por mal uso de ellos, las cotizaciones son revisadas y tienen un periodo de validación a partir que son creadas y generadas, para poder hacer válida una cotización esta debe ser emitida y firmada por los responsables de la empresa, de no ser asi la empresa no se hace responsable por cantidades y precios no autorizados.`,
            //             bold: true,
            //             italics: true,
            //             size: 14,
            //             font: "Segoe UI",
            //             color: "808080"
            //         })
            //     ]
            // }),
            new Paragraph({
                children: [new PageBreak()],
            })
        ];

        return docDetalleGeneral;

    }

    const seccionDetalleEspecificaciones = async (detalleCotizacionSelected) => {

        let docDetalleEspecificaciones = [];

        docDetalleEspecificaciones = [
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "ESPECIFICACIONES",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "__________________________________________________________________________________________",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "Polipasto",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `${detalleCotizacionSelected.puente.polipasto.polipasto.descripcion}`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "Troles",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            ...(
                (detalleCotizacionSelected.puente.trole.trole.id != 7) && 
                (
                    [                    
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        bullet: {
                            level: 0
                        },
                        children: [
                            new TextRun({
                                text: `Modelo ${detalleCotizacionSelected.puente.trole.trole.descripcion}`,
                                bold: false,
                                size: 19,
                                font: "Segoe UI",
                                color: "808080"
                            })
                        ]
                    })
                ]
                )
            ) || (
                [new Paragraph({
                    alignment: AlignmentType.LEFT,
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: `No requiere Trole.`,
                            bold: false,
                            size: 19,
                            font: "Segoe UI",
                            color: "808080"
                        })
                    ]
                }),              
                
            ]
            )
            ,
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "Cabezales",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Modelo ${detalleCotizacionSelected.puente.cabezales.descripcion}`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "Estructura",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Puente monorriel de sección IR.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Trabes carril de sección IR con riel cuadrado.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Columnas de sección HSS.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Tirantes “patas de gallo” en perfil tubular reforzado.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Todo en secciones de uso comercial en acero ASTM A-36 certificado.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Recubrimiento primario alquidálico anticorrosivo y acabado esmalte con color a elección del cliente.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "Alimentación Eléctrica y Control",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Barras conductoras de aislamiento seguro para recorrido de puente grúa monorriel.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Montaje vertical; 4 líneas de conducción (3 fases y tierra) con capacidad de 90 Amperes.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Se incluye accesorios, soportería, suspensores y todo lo necesario para su instalación. `,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Sistema tipo festoon para electrificación del puente con botonera.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Se incluye sistema de soportería con canaletas de soporte transversal con canaleta para carril en C, 
                        cable plano de PVC y todos los accesorios necesarios para su instalación.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Gabinete de control IP55.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Botonera colgante de recorrido independiente de 6 movimientos con paro de emergencia.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Alarma audiovisual para movimiento del puente.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "Instalación",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Flete a su planta en Mexicali, Baja California.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Proyecto llave en mano.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 0
                },
                children: [
                    new TextRun({
                        text: `Incluye:`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 1
                },
                children: [
                    new TextRun({
                        text: `Izaje e instalación de toda la estructura metálica necesaria.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 1
                },
                children: [
                    new TextRun({
                        text: `Izaje e instalación de equipos.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 1
                },
                children: [
                    new TextRun({
                        text: `Instalación del sistema completo de electrificación y control.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 1
                },
                children: [
                    new TextRun({
                        text: `ICOM se hace responsable por el suministro de equipo para el Izaje de la estructura y elevación de personal.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 1
                },
                children: [
                    new TextRun({
                        text: `Suministro de Kit para sistema de anclaje químico epóxico.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 1
                },
                children: [
                    new TextRun({
                        text: `Los gastos por instalación son responsabilidad de ICOM.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: {
                    level: 1
                },
                children: [
                    new TextRun({
                        text: `ICOM es responsable de la pintura y detalles en la estructura.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            // new Paragraph({
            //     children: [new PageBreak()],
            // })
        ];

        return docDetalleEspecificaciones;

    }

    const seccionDetallePropuestaEconomica = async (detalleCotizacionSelected) => {

        let docDetallePropuestaEconomica = [];

        docDetallePropuestaEconomica = [
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "PROPUESTA ECONÓMICA",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "__________________________________________________________________________________________",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: `GRÚA VIAJERA AUTO-SOPORTADA ${detalleCotizacionSelected.encabezado.capacidad} TONELADA(S)`,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "#0070c0"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: `TOTAL`,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "0070c0"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: `${Formatos.GetFormatoMoneda(detalleCotizacionSelected.totales.dolares.total)} USD + IVA`,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `TIEMPO DE ENTREGA`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    // new TextRun({
                    //     text: `8-10 semanas de fabricación y 1 semana de instalación`,
                    //     bold: false,
                    //     size: 19,
                    //     font: "Segoe UI",
                    //     color: "808080"
                    // }),
                    new TextRun({
                        text: `[ INGRESAR SEMANAS DE FABRICACIÓN E INSTALACIÓN ]`,
                        bold: false,
                        italics: true,
                        underline: {},
                        highlight: "yellow",
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `LUGAR DE ENTREGA`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Su planta: ${detalleCotizacionSelected.encabezado.ciudad.ciudad}.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `TÉRMINOS DE PAGO`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `     40% Anticipo.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `     40% Previo embarque.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `     20% Contra entrega.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Cotización válida por 10 días.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `NOTAS IMPORTANTES`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `*Los tiempos de entrega quedan sujetos a disponibilidad de equipos.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `*La fecha de entrega comienza una vez pagado el anticipo.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Sin más por el momento, quedo a su disposición para cualquier aclaración.`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: ``,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `[ INGRESAR FIRMA DIGITAL ]`,
                        bold: false,
                        italics: true,
                        underline: {},
                        highlight: "yellow",
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `${detalleCotizacionSelected.encabezado.usuario.nombre} ${detalleCotizacionSelected.encabezado.usuario.apellido}`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Representante de Ventas`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Cel. ${detalleCotizacionSelected.encabezado.usuario.telefono}`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `${detalleCotizacionSelected.encabezado.usuario.correo}`,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "0070c0",
                        underline: {
                            color: "0070c0",
                        },
                    })
                ]
            }),

            new Paragraph({
                children: [new PageBreak()],
            })
        ];

        return docDetallePropuestaEconomica;

    }

    const seccionDetalleEmpresa = async (detalleCotizacionSelected) => {
        const img1 = await fetch("/img/documento-empresa-1.jpg").then(r => r.blob());
        const img2 = await fetch("/img/documento-empresa-2.jpg").then(r => r.blob());
        const img3 = await fetch("/img/documento-empresa-3.jpg").then(r => r.blob());
        const img4 = await fetch("/img/documento-empresa-4.jpg").then(r => r.blob());

        let docDetalleEmpresa = [];

        docDetalleEmpresa = [
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "LA EMPRESA",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "__________________________________________________________________________________________",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Fundada en 1983 en Industrial Com, S.A de C.V. atendemos a las necesidades en movimiento y sujeción de carga con nuestra línea de grúas, polipastos y accesorios para el manejo de materiales. Estamos certificados en inspección de gruas y polipastos (Crane and Hoist Inspection) por la compañía Columbus McKinnon según los requerimientos de los estándares establecidos por la `,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    }),
                    new TextRun({
                        text: `OSHA (Occupational Safety and Health Administration) y la ASME (American Society of Mechanical Engineers).`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    }),

                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new ImageRun({
                        data: img1,
                        transformation: {
                            width: 295,
                            height: 150
                        },
                    }),
                    new TextRun({
                        text: `   `,
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    }),
                    new ImageRun({
                        data: img2,
                        transformation: {
                            width: 295,
                            height: 150
                        }
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new ImageRun({
                        data: img3,
                        transformation: {
                            width: 600,
                            height: 300
                        }
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new ImageRun({
                        data: img4,
                        transformation: {
                            width: 600,
                            height: 150
                        }
                    })
                ]
            })
        ];

        return docDetalleEmpresa;

    }

    const seccionDetalleEmpresaNueva = async (detalleCotizacionSelected) => {
        const img1 = await fetch("/img/nueva-imagen-empresa.jpeg").then(r => r.blob());

        let docDetalleEmpresa = [];

        docDetalleEmpresa = [
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "LA EMPRESA",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "__________________________________________________________________________________________",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: `Fundada en 1983 en Industrial Com S.A de C.V. atendemos a las necesidades en movimiento y sujeción de carga con nuestra línea de grúas, polipastos y accesorios para el manejo de materiales. Estamos certificados en inspección de grúas y polipastos (Crane and Hoist Inspection) por la compañía Columbus McKinnon según los requerimentos de los estándares establecidos por la `,
                        bold: false,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    }),
                    new TextRun({
                        text: `OSHA (Occupational Safety and Health Administration) y la ASME (American Society of Mechanical Engineers).`,
                        bold: true,
                        size: 19,
                        font: "Segoe UI",
                        color: "808080"
                    }),

                ]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        text: "",
                        bold: true,
                        size: 24,
                        font: "Segoe UI",
                        color: "808080"
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new ImageRun({
                        data: img1,
                        transformation: {
                            width: 600,
                            height: 700
                        },
                    }),
                ]
            })
        ];

        return docDetalleEmpresa;

    }

    const downloadDocument = async () => {

        const detalleCotizacionSelected = await getCotizacionInfo();
        if (detalleCotizacionSelected) {
            const seccionEncabezado = await seccionHeader();
            const seccionPie = await seccionFooter();

            const seccion1 = await seccionDetalleGeneral(detalleCotizacionSelected);
            const seccion2 = await seccionDetalleEspecificaciones(detalleCotizacionSelected);
            const seccion3 = await seccionDetallePropuestaEconomica(detalleCotizacionSelected);
            const seccion4 = await seccionDetalleEmpresaNueva(detalleCotizacionSelected);

            const doc = new Document({
                sections: [{
                    properties: {},
                    headers: seccionEncabezado,
                    footers: seccionPie,
                    children: [
                        ...seccion1,
                        ...seccion2,
                        ...seccion3,
                        ...seccion4
                    ],
                }],
            });

            // Used to export the file into a .docx file
            Packer.toBlob(doc).then(blob => {
                console.log(blob);
                saveAs(blob, `Cotizacion_${detalleCotizacionSelected.encabezado.folio}.docx`);
                console.log("Document created successfully");
            });

            // Done! A file called 'My Document.docx' will be in your file system.
        }


    }

    React.useEffect(() => {
    }, []);

    const getCotizacionInfo = async () => {
        const detalleCotizacion = await CotizacionesServices.GetCotizacionById(cotizacionSelected.id);

        console.log(detalleCotizacion, "DETALLE COTIZACION");
        

        return detalleCotizacion.data;
    }


    return (<h6>
        <Button ref={btnRef} onClick={downloadDocument} hidden>Descargar</Button>
    </h6>)
}

export default DocumentComponent;
