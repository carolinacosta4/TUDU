import React from "react";
import { ScrollView, Text, View } from "react-native";
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
};

const ListHome = ({
  allDayTasks,
  groupedTasks,
  filteredBills,
  changeStatus,
  user,
}: CardsHomeProps) => {
  return (
    <ScrollView>
      <View style={{ marginBottom: 450 }}>
        {(filteredBills.length > 0 || allDayTasks.length > 0) && (
          <>
            <Text
              style={{
                fontSize: 20,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Medium",
                marginTop: 24,
                marginBottom: 4,
                lineHeight: 20,
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
                    type="list"
                  />
                </Fragment>
              ))}
              {user.userBills &&
                filteredBills.map((bill) => (
                  <Fragment key={bill._id}>
                    <BillItem
                      bill={bill}
                      changeStatus={changeStatus}
                      type="list"
                    />
                  </Fragment>
                ))}
            </View>
          </>
        )}
        {groupedTasks.map((group) => (
          <Fragment key={group.time}>
            <Text
              style={{
                fontSize: 18,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Medium",
                marginTop: 10,
                marginBottom: 4,
                lineHeight: 20,
              }}
            >
              {group.time}
            </Text>
            <View
              style={{
                flexDirection: "column",
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
                    type="list"
                  />
                </Fragment>
              ))}
            </View>
          </Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

export default ListHome;
