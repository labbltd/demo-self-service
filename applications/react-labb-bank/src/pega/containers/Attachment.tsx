import { Attachment as PAttachment, FileStatus } from '@labb/dx-engine';
import { Button, Modal, Table, Form, Upload, UploadFile } from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';

export default function Attachment(props: {
  container: PAttachment;
}): JSX.Element {
  const [downloadedImage, setDownloadedImage] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);
  const { container } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function preview(file: FileStatus) {
    if (file.linked) {
      setDownloadedImage('data:image/png;base64,' + (await container.downloadFile(file.id)));
    } else {
      setDownloadedImage(file.src);
    }
    setShowModal(true);
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Size',
      key: 'size',
      render: (_: any, file: FileStatus) => container.formatBytes(file.size!),
    },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress', render: (p: number) => `${p}%` },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, file: FileStatus) => (
        <>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => container.removeFile(file.id)}
          >
            Delete
          </Button>
          {file.type.startsWith('image') && (
            <Button
              size="small"
              icon={<EyeOutlined />}
              style={{ marginLeft: 8 }}
              onClick={async () => preview(file)}
            >
              Preview
            </Button>
          )}
        </>
      ),
    },
  ];
  const fileList: UploadFile[] = [
    {
      uid: '0',
      name: 'xxx.png',
      status: 'uploading',
      percent: 33,
    },
    {
      uid: '-1',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'zzz.png',
      status: 'error',
    },
  ];
  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture"
        defaultFileList={fileList}
      >
        <Button type="primary" icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>
      <Form.Item
        label={container.config.label}
        required={container.config.required}
        help={container.config.helperText}
        validateStatus={container.config.validatemessage ? 'error' : ''}
        extra={container.config.validatemessage}
      >
        {(container.config.allowMultiple === 'true' || !container.files.length) && (
          <input
            ref={fileInputRef}
            id={container.id}
            type="file"
            onChange={(e) => container.uploadFile(e as unknown as Event)}
            multiple={container.config.allowMultiple === 'true'}
          />
        )}
        {container.files.length > 0 && (
          <Table
            columns={columns}
            dataSource={container.files}
            rowKey="id"
            pagination={false}
            style={{ marginTop: 12 }}
          />
        )}
        <Modal
          open={showModal}
          title="Image Preview"
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <img src={downloadedImage} alt="Preview" style={{ width: '100%' }} />
        </Modal>
      </Form.Item>
    </>
  );
}
