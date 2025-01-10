import React from "react";
import { Dimensions, ScrollView, Text, View, Platform } from "react-native";
import { Fragment } from "react";
import BillItem from "@/components/BillItem";
import TaskItem from "@/components/TaskItem";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import RightAction from "./RightAction";

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
  handleDelete,
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
                  lineHeight: 20
                }}
              >
                All-day
              </Text>
              <View style={{ flex: 1, rowGap: 8 }}>
                {allDayTasks.map((task) => (
                  <Fragment key={task._id}>
                    {Platform.OS == "ios" ? (
                      <ReanimatedSwipeable
                        containerStyle={{
                          backgroundColor: "#DDD8CE",
                          borderRadius: 16,
                        }}
                        friction={2}
                        enableTrackpadTwoFingerGesture
                        rightThreshold={40}
                        renderRightActions={(progress, dragX) =>
                          RightAction(progress, dragX, {
                            ID: task._id,
                            name: "task",
                            handleDelete,
                          })
                        }
                      >
                        <TaskItem
                          changeStatus={changeStatus}
                          task={task}
                          allDay={true}
                          type="cards"
                        />
                      </ReanimatedSwipeable>
                    ) : (
                      <TaskItem
                        changeStatus={changeStatus}
                        task={task}
                        allDay={true}
                        type="cards"
                      />
                    )}
                  </Fragment>
                ))}
                {user.userBills &&
                  filteredBills.map((bill) => (
                    <Fragment key={bill._id}>
                      {Platform.OS == "ios" ? (
                        <ReanimatedSwipeable
                          containerStyle={{
                            backgroundColor: "#DDD8CE",
                            borderRadius: 16,
                          }}
                          friction={2}
                          enableTrackpadTwoFingerGesture
                          rightThreshold={40}
                          renderRightActions={(progress, dragX) =>
                            RightAction(progress, dragX, {
                              ID: bill._id,
                              name: "bill",
                              handleDelete,
                            })
                          }
                        >
                          <BillItem
                            bill={bill}
                            changeStatus={changeStatus}
                            type="cards"
                            handleDelete={handleDelete}
                          />
                        </ReanimatedSwipeable>
                      ) : (
                        <BillItem
                          bill={bill}
                          changeStatus={changeStatus}
                          type="cards"
                          handleDelete={handleDelete}
                        />
                      )}
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
                  lineHeight: 20,
                  ...(group.time.split(":")[0].length != 1 && {
                    marginRight: "-2%",
                  }),
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
                    {Platform.OS == "ios" ? (
                      <ReanimatedSwipeable
                        containerStyle={{
                          backgroundColor: "#DDD8CE",
                          borderRadius: 16,
                        }}
                        friction={2}
                        enableTrackpadTwoFingerGesture
                        rightThreshold={40}
                        renderRightActions={(progress, dragX) =>
                          RightAction(progress, dragX, {
                            ID: task._id,
                            name: "task",
                            handleDelete,
                          })
                        }
                      >
                        <TaskItem
                          changeStatus={changeStatus}
                          task={task}
                          allDay={false}
                          type="cards"
                        />
                      </ReanimatedSwipeable>
                    ) : (
                      <TaskItem
                        changeStatus={changeStatus}
                        task={task}
                        allDay={false}
                        type="cards"
                      />
                    )}
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
