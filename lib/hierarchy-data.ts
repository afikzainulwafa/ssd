// PSM, Region, and Estate Hierarchy Dataset matching SRMD Monitoring & Profiling

export interface EstateItem {
  id: string;
  name: string;
}

export interface RegionItem {
  id: string;
  name: string;
  estates: EstateItem[];
}

export interface PsmItem {
  id: string;
  name: string;
  regions: RegionItem[];
}

export const SRMD_HIERARCHY_DATA: PsmItem[] = [
  {
    "id": "PSM A",
    "name": "PSM A",
    "regions": [
      {
        "id": "Region A",
        "name": "Region A",
        "estates": [
          {
            "id": "Estate A",
            "name": "Estate A"
          },
          {
            "id": "Estate B",
            "name": "Estate B"
          },
          {
            "id": "Estate C",
            "name": "Estate C"
          },
          {
            "id": "Estate D",
            "name": "Estate D"
          },
          {
            "id": "Estate E",
            "name": "Estate E"
          },
          {
            "id": "Estate F",
            "name": "Estate F"
          },
          {
            "id": "Estate G",
            "name": "Estate G"
          }
        ]
      },
      {
        "id": "Region B",
        "name": "Region B",
        "estates": [
          {
            "id": "Estate H",
            "name": "Estate H"
          },
          {
            "id": "Estate I",
            "name": "Estate I"
          },
          {
            "id": "Estate J",
            "name": "Estate J"
          },
          {
            "id": "Estate K",
            "name": "Estate K"
          }
        ]
      },
      {
        "id": "Region C",
        "name": "Region C",
        "estates": [
          {
            "id": "Estate L",
            "name": "Estate L"
          },
          {
            "id": "Estate M",
            "name": "Estate M"
          },
          {
            "id": "Estate N",
            "name": "Estate N"
          },
          {
            "id": "Estate O",
            "name": "Estate O"
          },
          {
            "id": "Estate P",
            "name": "Estate P"
          },
          {
            "id": "Estate Q",
            "name": "Estate Q"
          },
          {
            "id": "Estate R",
            "name": "Estate R"
          }
        ]
      }
    ]
  },
  {
    "id": "PSM B",
    "name": "PSM B",
    "regions": [
      {
        "id": "Region D",
        "name": "Region D",
        "estates": [
          {
            "id": "Estate S",
            "name": "Estate S"
          },
          {
            "id": "Estate T",
            "name": "Estate T"
          },
          {
            "id": "Estate U",
            "name": "Estate U"
          },
          {
            "id": "Estate V",
            "name": "Estate V"
          },
          {
            "id": "Estate W",
            "name": "Estate W"
          },
          {
            "id": "Estate X",
            "name": "Estate X"
          },
          {
            "id": "Estate Y",
            "name": "Estate Y"
          },
          {
            "id": "Estate Z",
            "name": "Estate Z"
          },
          {
            "id": "Estate AA",
            "name": "Estate AA"
          },
          {
            "id": "Estate AB",
            "name": "Estate AB"
          },
          {
            "id": "Estate AC",
            "name": "Estate AC"
          }
        ]
      },
      {
        "id": "Region E",
        "name": "Region E",
        "estates": [
          {
            "id": "Estate AD",
            "name": "Estate AD"
          },
          {
            "id": "Estate AE",
            "name": "Estate AE"
          }
        ]
      },
      {
        "id": "Region F",
        "name": "Region F",
        "estates": [
          {
            "id": "Estate AF",
            "name": "Estate AF"
          },
          {
            "id": "Estate AG",
            "name": "Estate AG"
          },
          {
            "id": "Estate AH",
            "name": "Estate AH"
          },
          {
            "id": "Estate AI",
            "name": "Estate AI"
          }
        ]
      },
      {
        "id": "Region G",
        "name": "Region G",
        "estates": [
          {
            "id": "Estate AJ",
            "name": "Estate AJ"
          },
          {
            "id": "Estate AK",
            "name": "Estate AK"
          },
          {
            "id": "Estate AL",
            "name": "Estate AL"
          },
          {
            "id": "Estate AM",
            "name": "Estate AM"
          }
        ]
      },
      {
        "id": "Region H",
        "name": "Region H",
        "estates": [
          {
            "id": "Estate AN",
            "name": "Estate AN"
          },
          {
            "id": "Estate AO",
            "name": "Estate AO"
          },
          {
            "id": "Estate AP",
            "name": "Estate AP"
          },
          {
            "id": "Estate AQ",
            "name": "Estate AQ"
          },
          {
            "id": "Estate AR",
            "name": "Estate AR"
          },
          {
            "id": "Estate AS",
            "name": "Estate AS"
          },
          {
            "id": "Estate AT",
            "name": "Estate AT"
          },
          {
            "id": "Estate AU",
            "name": "Estate AU"
          }
        ]
      }
    ]
  },
  {
    "id": "PSM C",
    "name": "PSM C",
    "regions": [
      {
        "id": "Region I",
        "name": "Region I",
        "estates": [
          {
            "id": "Estate AV",
            "name": "Estate AV"
          },
          {
            "id": "Estate AW",
            "name": "Estate AW"
          },
          {
            "id": "Estate AX",
            "name": "Estate AX"
          },
          {
            "id": "Estate AY",
            "name": "Estate AY"
          },
          {
            "id": "Estate AZ",
            "name": "Estate AZ"
          },
          {
            "id": "Estate BA",
            "name": "Estate BA"
          }
        ]
      },
      {
        "id": "Region J",
        "name": "Region J",
        "estates": [
          {
            "id": "Estate BB",
            "name": "Estate BB"
          },
          {
            "id": "Estate BC",
            "name": "Estate BC"
          },
          {
            "id": "Estate BD",
            "name": "Estate BD"
          },
          {
            "id": "Estate BE",
            "name": "Estate BE"
          },
          {
            "id": "Estate BF",
            "name": "Estate BF"
          },
          {
            "id": "Estate BG",
            "name": "Estate BG"
          },
          {
            "id": "Estate BH",
            "name": "Estate BH"
          }
        ]
      },
      {
        "id": "Region K",
        "name": "Region K",
        "estates": [
          {
            "id": "Estate BI",
            "name": "Estate BI"
          },
          {
            "id": "Estate BJ",
            "name": "Estate BJ"
          },
          {
            "id": "Estate BK",
            "name": "Estate BK"
          }
        ]
      },
      {
        "id": "Region L",
        "name": "Region L",
        "estates": [
          {
            "id": "Estate BL",
            "name": "Estate BL"
          },
          {
            "id": "Estate BM",
            "name": "Estate BM"
          },
          {
            "id": "Estate BN",
            "name": "Estate BN"
          },
          {
            "id": "Estate BO",
            "name": "Estate BO"
          }
        ]
      }
    ]
  },
  {
    "id": "PSM E",
    "name": "PSM E",
    "regions": [
      {
        "id": "Region M",
        "name": "Region M",
        "estates": [
          {
            "id": "Estate BP",
            "name": "Estate BP"
          },
          {
            "id": "Estate BQ",
            "name": "Estate BQ"
          },
          {
            "id": "Estate BR",
            "name": "Estate BR"
          },
          {
            "id": "Estate BS",
            "name": "Estate BS"
          },
          {
            "id": "Estate BT",
            "name": "Estate BT"
          },
          {
            "id": "Estate BU",
            "name": "Estate BU"
          },
          {
            "id": "Estate BV",
            "name": "Estate BV"
          }
        ]
      },
      {
        "id": "Region N",
        "name": "Region N",
        "estates": [
          {
            "id": "Estate BW",
            "name": "Estate BW"
          },
          {
            "id": "Estate BX",
            "name": "Estate BX"
          },
          {
            "id": "Estate BY",
            "name": "Estate BY"
          },
          {
            "id": "Estate BZ",
            "name": "Estate BZ"
          },
          {
            "id": "Estate CA",
            "name": "Estate CA"
          },
          {
            "id": "Estate CB",
            "name": "Estate CB"
          }
        ]
      },
      {
        "id": "Region O",
        "name": "Region O",
        "estates": [
          {
            "id": "Estate CC",
            "name": "Estate CC"
          },
          {
            "id": "Estate CD",
            "name": "Estate CD"
          },
          {
            "id": "Estate CE",
            "name": "Estate CE"
          }
        ]
      },
      {
        "id": "Region P",
        "name": "Region P",
        "estates": [
          {
            "id": "Estate CF",
            "name": "Estate CF"
          }
        ]
      }
    ]
  },
  {
    "id": "PSM F",
    "name": "PSM F",
    "regions": [
      {
        "id": "Region Q",
        "name": "Region Q",
        "estates": [
          {
            "id": "Estate CG",
            "name": "Estate CG"
          },
          {
            "id": "Estate CH",
            "name": "Estate CH"
          },
          {
            "id": "Estate CI",
            "name": "Estate CI"
          },
          {
            "id": "Estate CJ",
            "name": "Estate CJ"
          },
          {
            "id": "Estate CK",
            "name": "Estate CK"
          }
        ]
      },
      {
        "id": "Region R",
        "name": "Region R",
        "estates": [
          {
            "id": "Estate CL",
            "name": "Estate CL"
          },
          {
            "id": "Estate CM",
            "name": "Estate CM"
          },
          {
            "id": "Estate CN",
            "name": "Estate CN"
          },
          {
            "id": "Estate CO",
            "name": "Estate CO"
          },
          {
            "id": "Estate CP",
            "name": "Estate CP"
          }
        ]
      },
      {
        "id": "Region S",
        "name": "Region S",
        "estates": [
          {
            "id": "Estate CQ",
            "name": "Estate CQ"
          },
          {
            "id": "Estate CR",
            "name": "Estate CR"
          },
          {
            "id": "Estate CS",
            "name": "Estate CS"
          },
          {
            "id": "Estate CT",
            "name": "Estate CT"
          },
          {
            "id": "Estate CU",
            "name": "Estate CU"
          },
          {
            "id": "Estate CV",
            "name": "Estate CV"
          },
          {
            "id": "Estate CW",
            "name": "Estate CW"
          },
          {
            "id": "Estate CX",
            "name": "Estate CX"
          }
        ]
      },
      {
        "id": "Region T",
        "name": "Region T",
        "estates": [
          {
            "id": "Estate CY",
            "name": "Estate CY"
          },
          {
            "id": "Estate CZ",
            "name": "Estate CZ"
          },
          {
            "id": "Estate DA",
            "name": "Estate DA"
          },
          {
            "id": "Estate DB",
            "name": "Estate DB"
          },
          {
            "id": "Estate DC",
            "name": "Estate DC"
          }
        ]
      },
      {
        "id": "Region U",
        "name": "Region U",
        "estates": [
          {
            "id": "Estate DD",
            "name": "Estate DD"
          },
          {
            "id": "Estate DE",
            "name": "Estate DE"
          },
          {
            "id": "Estate DF",
            "name": "Estate DF"
          },
          {
            "id": "Estate DG",
            "name": "Estate DG"
          },
          {
            "id": "Estate DH",
            "name": "Estate DH"
          },
          {
            "id": "Estate DI",
            "name": "Estate DI"
          },
          {
            "id": "Estate DJ",
            "name": "Estate DJ"
          }
        ]
      },
      {
        "id": "Region V",
        "name": "Region V",
        "estates": [
          {
            "id": "Estate DK",
            "name": "Estate DK"
          },
          {
            "id": "Estate DL",
            "name": "Estate DL"
          },
          {
            "id": "Estate DM",
            "name": "Estate DM"
          }
        ]
      },
      {
        "id": "Region W",
        "name": "Region W",
        "estates": [
          {
            "id": "Estate DN",
            "name": "Estate DN"
          },
          {
            "id": "Estate DO",
            "name": "Estate DO"
          },
          {
            "id": "Estate DP",
            "name": "Estate DP"
          },
          {
            "id": "Estate DQ",
            "name": "Estate DQ"
          }
        ]
      },
      {
        "id": "Region X",
        "name": "Region X",
        "estates": [
          {
            "id": "Estate DR",
            "name": "Estate DR"
          },
          {
            "id": "Estate DS",
            "name": "Estate DS"
          },
          {
            "id": "Estate DT",
            "name": "Estate DT"
          },
          {
            "id": "Estate DU",
            "name": "Estate DU"
          }
        ]
      }
    ]
  },
  {
    "id": "PSM G",
    "name": "PSM G",
    "regions": [
      {
        "id": "Region Y",
        "name": "Region Y",
        "estates": [
          {
            "id": "Estate DV",
            "name": "Estate DV"
          },
          {
            "id": "Estate DW",
            "name": "Estate DW"
          },
          {
            "id": "Estate DX",
            "name": "Estate DX"
          },
          {
            "id": "Estate DY",
            "name": "Estate DY"
          }
        ]
      },
      {
        "id": "Region Z",
        "name": "Region Z",
        "estates": [
          {
            "id": "Estate DZ",
            "name": "Estate DZ"
          },
          {
            "id": "Estate EA",
            "name": "Estate EA"
          },
          {
            "id": "Estate EB",
            "name": "Estate EB"
          },
          {
            "id": "Estate EC",
            "name": "Estate EC"
          },
          {
            "id": "Estate ED",
            "name": "Estate ED"
          },
          {
            "id": "Estate EE",
            "name": "Estate EE"
          }
        ]
      },
      {
        "id": "Region AA",
        "name": "Region AA",
        "estates": [
          {
            "id": "Estate EF",
            "name": "Estate EF"
          },
          {
            "id": "Estate EG",
            "name": "Estate EG"
          },
          {
            "id": "Estate EH",
            "name": "Estate EH"
          },
          {
            "id": "Estate EI",
            "name": "Estate EI"
          },
          {
            "id": "Estate EJ",
            "name": "Estate EJ"
          }
        ]
      }
    ]
  }
];
