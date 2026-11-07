import { Pressable } from "react-native";

import { Row } from "./surface";
import { T } from "./text";
export function Section({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <Row className="justify-between">
      <T size={17} bold>
        {title}
      </T>
      {!!action && (
        <Pressable accessibilityRole="button" onPress={onPress} hitSlop={8}>
          <T size={12} className="text-nebula-purple">
            {action}
          </T>
        </Pressable>
      )}
    </Row>
  );
}
