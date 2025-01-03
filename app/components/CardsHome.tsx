import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Fragment } from "react";
import BillItem from "@/components/BillItem";
import TaskItem from "@/components/TaskItem";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";

type CardsHomeProps = {
  allDayTasks: Task[];
  groupedTasks: { time: string; tasks: Task[] }[];
  filteredBills: Bill[];
  changeStatus: (data: Task | Bill, name: string) => void;
  user: any;
  handleDelete: (id: string, type: string) => void;
};

const CardsHome = ({
  allDayTasks,
  groupedTasks,
  filteredBills,
  changeStatus,
  user,
  handleDelete
}: CardsHomeProps) => {
  const width = Dimensions.get("window").width;
  
  return (
    <ScrollView>
      <View style={{ marginBottom: width / 0.8 }}>
        {(filteredBills.length > 0 || allDayTasks.length > 0) && (
          <>
            <View
              style={{
                flexDirection: "row",
                columnGap: "6%",
                marginTop: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#A5A096",
                  fontFamily: "Rebond-Grotesque-Medium",
                }}
              >
                All-day
              </Text>
              <View style={{ flex: 1, rowGap: 8 }}>
                {allDayTasks.map((task) => (
                  <Fragment key={task._id}>
                    <TaskItem
                      changeStatus={changeStatus}
                      task={task}
                      allDay={true}
                      type="cards"
                      handleDelete={handleDelete}
                    />
                  </Fragment>
                ))}
                {user.userBills &&
                  filteredBills.map((bill) => (
                    <Fragment key={bill._id}>
                      <BillItem
                        bill={bill}
                        changeStatus={changeStatus}
                        type="cards"
                        handleDelete={handleDelete}
                      />
                    </Fragment>
                  ))}
              </View>
            </View>
            <View
              style={{
                height: 2,
                backgroundColor: "#DDD8CE",
                marginTop: 10,
              }}
            ></View>
          </>
        )}
        {groupedTasks.map((group) => (
          <Fragment key={group.time}>
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#A5A096",
                  fontFamily: "Rebond-Grotesque-Medium",
                }}
              >
                {group.time}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 16,
                  flex: 1,
                  rowGap: 8,
                }}
              >
                {group.tasks.map((task) => (
                  <Fragment key={task._id}>
                    <TaskItem
                      changeStatus={changeStatus}
                      task={task}
                      allDay={false}
                      type="cards"
                      handleDelete={handleDelete}
                    />
                  </Fragment>
                ))}
              </View>
            </View>
          </Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

export default CardsHome;
