import { Document, Image, Page, Text, View } from '@react-pdf/renderer';

export type PDFTemplateProps = {
  data: Array<{
    id: string;
    name: string;
    avatar: string;
    about: string;
  }>;
};

export function PDFTemplate({ data }: PDFTemplateProps) {
  return (
    <Document>
      <Page>
        <View style={{ gap: 8, padding: 8 }}>
          {data.map(user => (
            <View
              key={user.id}
              style={{
                gap: 4,
                flexDirection: 'row',
                backgroundColor: '#e6e3e3',
                padding: 8,
                borderRadius: 4,
              }}
            >
              <Image src={user.avatar} style={{ width: 100, height: 100 }} />
              <View>
                <Text style={{ fontSize: 20 }}>{user.name}</Text>
                <Text wrap style={{ fontSize: 16, color: '#565656' }}>
                  {user.about}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
